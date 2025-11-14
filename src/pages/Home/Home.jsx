import React from "react";
import DynamicFood from "./DynamicFood";
import HowItWork from "./HowItWork";
import OurMissions from "./OurMissions";
import Banner from "./Banner";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <DynamicFood></DynamicFood>
      <HowItWork></HowItWork>
      <OurMissions></OurMissions>
    </div>
  );
}

export default HomePage;
