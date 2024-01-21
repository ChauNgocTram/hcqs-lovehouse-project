import { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";

import Routers from "./routes/Routers";
import { getAccountById, getNewToken } from "./api";
import { SET_USER, SET_USER_NULL } from "./context/actions/userActions";
import { logout } from "./context/actions/authActions";

function App() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const accountId = decodedToken?.AccountId;

        const currentTime = new Date().getTime() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log("Token expired. Refreshing token...");
          const newTokenResult = await getNewToken(accountId, refreshToken);
          if (newTokenResult) {
            console.log("New token received: ", newTokenResult);
            dispatch(SET_USER(newTokenResult.result.data));
          } else {
            dispatch(logout());
            dispatch(SET_USER_NULL());
          }
        } else {
          console.log("Bearer ", accessToken);

          if (accountId) {
            const accountData = await getAccountById(accountId, accessToken);
            console.log("account data: ", accountData.result.data);
            dispatch(SET_USER(accountData.result.data));
          } else {
            console.log("Invalid account ID. Handle accordingly.");
          }
        }
      } catch (err) {
        console.error("Error decoding token: ", err);
        return false;
      }
    } else {
      console.log("No access token received.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto ">
      <ToastContainer position="top-right" autoClose={2000} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Routers />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
