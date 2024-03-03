import React from 'react'
import { StaffSidebar, DBHeader } from '../../../components'

function WorkerManagement() {
  return (
    <>
    // <LoadingOverlay loading={loading} />

    <div className="flex overflow-hidden">
      <StaffSidebar />
      <div className="h-screen overflow-y-auto flex-1">
        <DBHeader />
        <div className="">
          
        </div>
      </div>
    </div>
  </>
  )
}

export default WorkerManagement
