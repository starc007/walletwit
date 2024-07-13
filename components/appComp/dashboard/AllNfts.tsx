import { useDataContext } from "@/context/DataContext";
import React from "react";
import NFTCard from "./NFTCard";
import Image from "next/image";
import { rasters } from "@/assets";

const AllNfts = () => {
  const { nftData } = useDataContext();
  return nftData?.items?.length === 0 || !nftData ? (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center border-2 border-gray-100 bg-gray-50 rounded-2xl h-48 mt-10">
      <Image src={rasters.nft} alt="coin" className="w-16 h-16" />
      <p className="text-primaryLight font-medium mt-5 text-lg">
        No nfts in your wallet
      </p>
    </div>
  ) : (
    <>
      <h2 className="text-xl font-semibold text-primary/50">
        Nfts owned by you
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
        {nftData?.items?.map((nft: any) => (
          <NFTCard
            key={nft.id}
            name={nft.content.metadata.name}
            description={nft.content.metadata.description}
            image={nft.content.links.image}
            id={nft.id}
            creators={nft.creators}
            royaltyPercentage={nft.royalty?.percent}
          />
        ))}
      </div>
    </>
  );
};

export default AllNfts;
