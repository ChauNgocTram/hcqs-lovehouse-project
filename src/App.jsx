import { BrowserRouter as Routes } from "react-router-dom";
import Routers from "./routes/Routers";
import { Suspense } from "react";

function App() {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Routers />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
