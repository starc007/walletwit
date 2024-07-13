import { useDataContext } from "@/context/DataContext";
import React from "react";
import NFTCard from "./NFTCard";

const AllNfts = () => {
  const { nftData } = useDataContext();
  return nftData?.items?.length === 0 || !nftData ? (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-primary/60">no nfts found</h2>
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
