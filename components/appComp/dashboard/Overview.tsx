import { rasters } from "@/assets";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import React from "react";
import BarLoader from "../common/BarLoader";
import { formatLamports } from "@/utils/utils";

const Overview = () => {
  const { isLoading, nftData } = useDataContext();

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full mt-5">
      {isLoading ? (
        <>
          <BarLoader bar={3} />
          <BarLoader bar={3} />
          <BarLoader bar={3} />
          <BarLoader bar={3} />
        </>
      ) : (
        <>
          <div className="flex flex-col border border-gray-100  rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image src={rasters.wallet} alt="wallet" className="w-10 h-10" />
            <p className="font-medium pt-5 text-primaryLight/60">
              total balance
            </p>
            <p className="text-2xl font-semibold mt-2">$100,000</p>
          </div>
          <div className="flex flex-col border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image src={rasters.solana} alt="wallet" className="w-10 h-10" />
            <p className="font-medium pt-5 text-primaryLight/60">sol balance</p>
            <p className="text-2xl font-semibold mt-2">
              ${nftData?.nativeBalance?.total_price?.toFixed(2)}
              <span className="text-primaryLight/60 text-balance ml-2  text-base">
                ({formatLamports(nftData?.nativeBalance?.lamports)} SOL)
              </span>
            </p>
          </div>
          <div className="flex flex-col border border-gray-100  rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image src={rasters.nft} alt="wallet" className="w-10 h-10" />
            <p className="font-medium pt-5 text-primaryLight/60">
              total nft&apos;s
            </p>
            <p className="text-2xl font-semibold mt-2">
              {nftData?.grand_total}
            </p>
          </div>
          <div className="flex flex-col border border-gray-100  rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image
              src={rasters.transaction}
              alt="wallet"
              className="w-10 h-10"
            />
            <p className="font-medium pt-5 text-primaryLight/60">
              total transactions
            </p>
            <p className="text-2xl font-semibold mt-2">169</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
