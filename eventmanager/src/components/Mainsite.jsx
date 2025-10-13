import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SocialFeed from "../components/Socialfeed";
import Artists from "../components/Artists";
import Events from "../components/Events";
import Merch from "../components/Merch";
import Footer from "../components/Footer";


const MainSite = () => {
  return (
    <>
      <Header/>
      <Hero/>
      <Artists/>
      <Merch/>
      <Events/>
      <SocialFeed/>
      <Footer/>
    </>
  );
};

export default MainSite;
