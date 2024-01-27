import { Outlet } from "react-router";
import { DBFooter, DBHeader, DBSidebar } from "../../components";
import { useState } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="grid grid-cols-5">
      {isOpen ? (
        <>
          <DBSidebar setIsOpen={setIsOpen} />
          <div className="col-span-4 w-full">
            <div className="sticky top-0 z-50">
              <DBHeader setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
            <Outlet />
            <div className="py-20"></div>
            <div className="fixed w-[80%] bottom-0 z-50">
              <DBFooter />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-span-5 w-full">
            <div className="sticky top-0 z-50">
              <DBHeader setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
            <Outlet />
            <div className="py-20"></div>
            <div className="fixed w-[100%] bottom-0 z-50">
              <DBFooter />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
