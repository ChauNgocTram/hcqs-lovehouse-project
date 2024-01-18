import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import Footer from "../../components/Footer/Footer";
import IntroSection from "../../components/HomeComponent/IntroSection"
import Parallax from "../../components/HomeComponent/Parallax";
import NewsSection from "../../components/HomeComponent/NewsSection";
import ProjectsSection from "../../components/HomeComponent/ProjectsSection";
import QuoteSection from "../../components/HomeComponent/QuoteSection";
import WhySection from "../../components/HomeComponent/WhySection";


function Home() {
  return (
    <>
    <div className="content-wrapper max-w-screen-2xl text-base ">
    <Navbar />
      <Slider />
      <IntroSection/>
      <Parallax/>
      <QuoteSection/>
      <ProjectsSection/>
      <WhySection/>
      <NewsSection/>
      
      <Footer />
      
    </div>
      
    </>
  );
}

export default Home;
