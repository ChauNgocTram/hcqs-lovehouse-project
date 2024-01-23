import { Outlet } from "react-router";
import { DBHeader, DBSidebar } from "../../components";

function Dashboard() {
  return (
    <div className="grid grid-cols-5">
      <DBSidebar />
      <div className="col-span-4">
        <DBHeader />
        <Outlet />
        <div>Footer</div>
      </div>
    </div>
  );
}

export default Dashboard;
