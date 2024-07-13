import { Hero } from "@/components/appComp/landing";
import React from "react";
import Feature from "@/components/appComp/landing/Feature";
import Footer from "@/components/appComp/landing/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Footer />
    </>
  );
};

export default Home;
