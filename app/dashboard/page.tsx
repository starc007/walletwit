"use client";
import { Tabs } from "@/components";
import {
  AllNfts,
  AllTokens,
  AllTransactions,
  Overview,
} from "@/components/appComp/dashboard";
import { DataContextProvider } from "@/context/DataContext";
import { shortenAddress } from "@/utils/utils";
import { useWallet } from "@jup-ag/wallet-adapter";
import React from "react";

const tabList = [
  {
    title: "tokens",
    content: <AllTokens />,
  },
  {
    title: "nfts",
    content: <AllNfts />,
  },
  {
    title: "transactions",
    content: <AllTransactions />,
  },
];

const Dashboard = () => {
  const { publicKey } = useWallet();
  return (
    <DataContextProvider>
      <div className="max-w-6xl mx-auto my-10 lg:px-10">
        <h2 className="text-3xl font-semibold">
          Gm, {shortenAddress(publicKey?.toString()!)}
        </h2>
        <h2 className="text-xl mt-10 font-semibold text-primary/60">
          wallet overview
        </h2>
        <Overview />
        <div className="mt-10">
          <Tabs tabList={tabList} />
        </div>
      </div>
    </DataContextProvider>
  );
};

export default Dashboard;
