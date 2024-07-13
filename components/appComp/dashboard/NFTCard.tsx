import { shortenAddress } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const NFTCard: FC<INFT> = ({
  image,
  name,
  description,
  id,
  creators,
  royaltyPercentage,
}) => {
  return (
    <div className="border border-gray-100 rounded-xl p-3 flex flex-col">
      <Image
        src={image}
        alt="nft"
        className="w-full h-52 object-cover rounded-xl hover:scale-105 transition-all duration-300"
        width={400}
        height={400}
      />
      <div className="flex flex-col gap-2 mt-5 px-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-primary/60 text-sm line-clamp-2">{description}</p>
      </div>

      <div className="flex justify-between items-center mt-5  px-2">
        <div className="flex items-center gap-2">
          <p className="text-primary/60">royalty</p>
          <p className="text-primary/60">{royaltyPercentage?.toFixed(2)}%</p>
        </div>
        <Link
          href={`https://solscan.io/token/${id}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-xs underline"
        >
          view on <span className="text-primary/60">solana</span>
        </Link>
      </div>
      <div className="px-2 mt-3">
        <p className="text-sm text-gray-400">creators</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {creators.map((creator: any) => (
            <div
              key={creator.address}
              className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-lg"
            >
              <p className="text-primary/60 text-xs">
                {shortenAddress(creator.address)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
