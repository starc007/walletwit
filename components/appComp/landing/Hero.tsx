"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/UI";
import AnimatedShinyText from "../AnimatedShinyText";

const Hero = () => {
  return (
    <section className="md:py-28 py-10 relative">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mx-auto max-w-5xl"
      >
        <div
          className={
            "group rounded-full border border-primary/5 bg-neutral-50 text-sm text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-100"
          }
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300">
            <span>✨ introducing walletWit</span>
          </AnimatedShinyText>
        </div>
        <h1 className="sm:text-7xl text-5xl font-bold text-primary mt-3">
          Hilarious insights
          <span className="md:block mt-2">
            <span className="bg-gradient-to-r from-neutral-400 via-primary/80 to-neutral-500 text-transparent bg-clip-text">
              serious results.
            </span>
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-4">
          Smart crypto analytics with a humorous twist. Track transactions,
          balances,
          <span className="md:block">
            and more in a fun and simplified way.
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-5 mt-8">
          <Button className="!h-11">Connect Wallet</Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
