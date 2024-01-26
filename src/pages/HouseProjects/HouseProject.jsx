import React from 'react'
import HouseProjectsBanner from '../../components/Banner/HouseProjectsBanner'
import HouseRoofSection from '../../components/HouseProjectsComponent/HouseRoofSection'
import TownHouseSection from '../../components/HouseProjectsComponent/TownHouseSection'

function HouseProject() {
  return (
   <>
   <HouseProjectsBanner/>
   <HouseRoofSection/>
   <TownHouseSection/>
   </>
  )
}

export default HouseProject