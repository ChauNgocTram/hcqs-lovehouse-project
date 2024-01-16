import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <p>Header</p>
      <Outlet></Outlet>
      <p>Footer</p>
    </div>
  );
}

export default HomeLayout;
