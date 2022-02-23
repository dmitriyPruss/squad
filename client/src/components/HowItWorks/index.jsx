import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import BeginInfoBlock from "./BeginInfoBlock";
import ThreeWaysBlock from "./ThreeWaysBlock";
import NamingContestWork from "./NamingContestWork";
import ReadyStarted from "./ReadyStarted";
import CompaniesList from "./CompaniesList";
import Tool from "./Tool";
import InfoBlock from "./InfoBlock";
import ContestsList from "./ContestsList";

const HowItWorks = () => {
  return (
    <>
      <Header></Header>
      <BeginInfoBlock />
      <ThreeWaysBlock />
      <NamingContestWork />
      <ContestsList />
      <ReadyStarted />
      <Tool />
      <InfoBlock />
      <CompaniesList />
      <Footer></Footer>
    </>
  );
};

export default HowItWorks;
