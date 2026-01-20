import React from "react";
import DynamicFood from "./DynamicFood";
import HowItWork from "./HowItWork";
import OurMissions from "./OurMissions";
import Banner from "./Banner";
import Features from "./Features";
import Service from "./Service";
import FAQ from "./FAQ";
import NewsLetter from "./NewsLetter";
import WhyShareFood from "./WhyShareFood";
import Hero from "./Hero";
import VolunteerSection from "./VolunteerSection";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Hero></Hero>
      <DynamicFood></DynamicFood>
      <HowItWork></HowItWork>
      <Features></Features>
      <Service></Service>
      <WhyShareFood></WhyShareFood>
      <VolunteerSection></VolunteerSection>
      <OurMissions></OurMissions>
      <FAQ></FAQ>
      <NewsLetter></NewsLetter>
    </div>
  );
}

export default HomePage;
