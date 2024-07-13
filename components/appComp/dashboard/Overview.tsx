import { rasters } from "@/assets";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import React, { useMemo } from "react";
import BarLoader from "../common/BarLoader";
import { formatLamports } from "@/utils/utils";

const Overview = () => {
  const { isLoading, nftData, tokensPrices, tokensInfo } = useDataContext();

  const totalPrice = useMemo(() => {
    let total = 0;
    const isTokenPrices = Object.keys(tokensPrices).length > 0;
    if (isTokenPrices && tokensInfo.length > 0) {
      tokensInfo.forEach((token: any) => {
        const pricePerToken = tokensPrices[token.address]?.price;
        const totalTokens = token.amount / 10 ** token.decimals;
        const price = pricePerToken * totalTokens;
        if (price) {
          total += price;
        }
      });
    }
    return total;
  }, [tokensPrices, tokensInfo]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full mt-5">
      {isLoading ? (
        <>
          <BarLoader bar={3} />
          <BarLoader bar={3} />
          <BarLoader bar={3} />
        </>
      ) : (
        <>
          <div className="flex flex-col border border-gray-100  rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image src={rasters.wallet} alt="wallet" className="w-10 h-10" />
            <p className="font-medium pt-5 text-primaryLight/60">portfolio</p>
            <p className="text-2xl font-semibold mt-2">
              ${(totalPrice + nftData?.nativeBalance?.total_price).toFixed(2)}
            </p>
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
          {/* <div className="flex flex-col border border-gray-100  rounded-2xl p-5 hover:bg-gray-50 transition duration-300">
            <Image
              src={rasters.transaction}
              alt="wallet"
              className="w-10 h-10"
            />
            <p className="font-medium pt-5 text-primaryLight/60">
              total transactions
            </p>
            <p className="text-2xl font-semibold mt-2">169</p>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Overview;
