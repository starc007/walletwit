"use client";
import { AllTokens, Overview } from "@/components/appComp/dashboard";
import { DataContextProvider } from "@/context/DataContext";
import { shortenAddress } from "@/utils/utils";
import { useWallet } from "@jup-ag/wallet-adapter";
import React from "react";

const Dashboard = () => {
  const { publicKey } = useWallet();
  return (
    <DataContextProvider>
      <div className="max-w-6xl mx-auto h-96 mt-10 lg:px-10">
        <h2 className="text-3xl font-semibold">
          Gm, {shortenAddress(publicKey?.toString()!)}
        </h2>
        <h2 className="text-xl mt-10 font-semibold text-primary/60">
          wallet overview
        </h2>
        <Overview />
        <h2 className="text-xl mt-10 font-semibold text-primary/60">
          your tokens
        </h2>
        <AllTokens />
      </div>
    </DataContextProvider>
  );
};

export default Dashboard;
