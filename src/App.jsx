import { BrowserRouter as Routes } from "react-router-dom";
import { Suspense } from "react";
import Routers from "./routes/Routers";

function App() {
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