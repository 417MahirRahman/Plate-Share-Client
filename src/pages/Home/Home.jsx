import React from "react";
import DynamicFood from "./DynamicFood";
import HowItWork from "./HowItWork";
import OurMissions from "./OurMissions";
import Banner from "./Banner";
import Features from "./Features";
import Service from "./Service";
import FAQ from "./FAQ";
import NewsLetter from "./NewsLetter";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <DynamicFood></DynamicFood>
      <HowItWork></HowItWork>
      <Features></Features>
      <Service></Service>
      <OurMissions></OurMissions>
      <FAQ></FAQ>
      <NewsLetter></NewsLetter>
    </div>
  );
}

export default HomePage;
