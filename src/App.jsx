import { useEffect } from "react";
import { BrowserRouter as Routes } from "react-router-dom";
import { Suspense } from "react";
import Routers from "./routes/Routers";
import { auth } from "./config/firebase.config";
import { getAccountById, googleCallback } from "./api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userCred) => {
      if (userCred) {
        userCred.getIdToken().then(async (token) => {
          console.log("token: ", token);
          googleCallback(token)
            .then(async (result) => {
              console.log("callback: ", result);
              const refreshToken = result?.result?.data?.refreshToken;
              const accessToken = result?.result?.data?.token;

              if (accessToken) {
                console.log("refreshToken: ", refreshToken);
                try {
                  const decodedToken = jwtDecode(accessToken);
                  const accountId = decodedToken?.AccountId;
                  console.log("jwtDecode: ", decodedToken);
                  console.log("exp: ", decodedToken.exp);
                  console.log("accountId: ", accountId);

                  const currentTime = new Date().getTime() / 1000;
                  if (decodedToken.exp < currentTime) {
                    console.log("Token expired. Refreshing token...");
                    const newTokenResult = await getNewToken(
                      accountId,
                      refreshToken
                    );
                    if (newTokenResult) {
                      console.log("New token received: ", newTokenResult);
                    } else {
                      console.log("Failed to refresh token.");
                    }
                  }

                  console.log("Bearer ", accessToken);

                  // Gọi getAccountById và sử dụng giá trị trả về
                  if (accountId) {
                    const accountData = await getAccountById(
                      accountId,
                      accessToken
                    );
                    console.log("account data: ", accountData.result.data);
                    dispatch(SET_USER(accountData.result.data));
                  } else {
                    console.log("Invalid account ID. Handle accordingly.");
                  }
                } catch (err) {
                  console.error("Error decoding token: ", err);
                  return false;
                }
              } else {
                console.log("No access token received.");
              }
            })
            .catch((error) => {
              console.error("Error in Google Callback: ", error);
            });
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto ">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Routers />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
