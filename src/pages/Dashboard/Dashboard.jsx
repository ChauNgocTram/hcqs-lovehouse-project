import { Outlet } from "react-router";
import { DBFooter, DBHeader, DBSidebar } from "../../components";

function Dashboard() {
  return (
    <div className="grid grid-cols-5">
      <DBSidebar />
      <div className="col-span-4">
        <div className="sticky top-0 z-50">
          <DBHeader />
        </div>
        <Outlet />
        <div className="flex-none">
          <DBFooter />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
