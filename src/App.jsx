import { BrowserRouter as Routes } from "react-router-dom";
import { Suspense } from "react";
import Routers from "./routes/Routers";


function App() {
  return (

          <Routers />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
