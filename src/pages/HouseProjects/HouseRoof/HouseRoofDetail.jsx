import React from "react";

import OtherSection from "./OtherSection";
import ImageDetailSection from "../ImageDetailSection";
import OverviewProjectSection from "../OverviewProjectSection";
import HeaderComponent from "../HeaderComponent";

export default function HouseRoofDetail() {
  return (
    <>
      <HeaderComponent/>
      
      <ImageDetailSection />

      <OverviewProjectSection />

      <OtherSection />
    </>
  );
}
