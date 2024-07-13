import { getTokenInfo } from "@/api/api";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect } from "react";
import BarLoader from "../common/BarLoader";
import Image from "next/image";
import { rasters } from "@/assets";
import TokenTable from "./TokenTable";

const AllTokens = () => {
  const { loader, tokensInfo } = useDataContext();

  return loader ? (
    <div className="mt-5">
      <BarLoader />
    </div>
  ) : (
    <div className="mt-1">
      {tokensInfo.length > 0 ? (
        <>
          <h2 className="text-xl font-medium text-primary/50">Your tokens</h2>
          <div className="mt-2">
            <TokenTable tokens={tokensInfo} loading={loader} />
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto flex flex-col items-center justify-center border-2 border-gray-100 bg-gray-50 rounded-2xl h-48 mt-10">
          <Image src={rasters.coin} alt="coin" className="w-20 h-20" />
          <p className="text-primaryLight font-medium mt-2">
            No coins in your wallet
          </p>
        </div>
      )}
    </div>
  );
};

export default AllTokens;
