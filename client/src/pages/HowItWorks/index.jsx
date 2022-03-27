import React from "react";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import BeginInfoBlock from "./../../components/HowItWorksComponents/BeginInfoBlock";
import ThreeWaysBlock from "./../../components/HowItWorksComponents/ThreeWaysBlock";
import NamingContestWork from "./../../components/HowItWorksComponents/NamingContestWork";
import ReadyStarted from "./../../components/HowItWorksComponents/ReadyStarted";
import CompaniesList from "./../../components/HowItWorksComponents/CompaniesList";
import Tool from "./../../components/HowItWorksComponents/Tool";
import InfoBlock from "./../../components/HowItWorksComponents/InfoBlock";
import ContestsList from "./../../components/HowItWorksComponents/ContestsList";

const HowItWorks = () => {
  return (
    <>
      <Header />
      <BeginInfoBlock />
      <ThreeWaysBlock />
      <NamingContestWork />
      <ContestsList />
      <ReadyStarted />
      <Tool />
      <InfoBlock />
      <CompaniesList />
      <Footer />
    </>
  );
};

export default HowItWorks;
