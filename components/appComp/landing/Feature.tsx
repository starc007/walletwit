import { rasters } from "@/assets";
import Image from "next/image";
import React from "react";

const FeaturesData = [
  {
    title: "Real-Time Portfolio Insights",
    icon: rasters.wallet,
    description:
      "Get an instant overview of your crypto holdings, including detailed breakdowns of coins and NFTs. Visualize your portfolio distribution and performance with interactive charts.",
  },
  {
    title: "Comprehensive Transaction History",
    icon: rasters.transaction,
    description:
      "Access a complete log of all your wallet transactions. Categorized and detailed views help you understand your spending habits and transaction patterns effortlessly.",
  },
  {
    title: "NFT Gallery and Analytics",
    icon: rasters.nft,
    description:
      "Explore your NFT collection in a stunning gallery format. View rarity scores, value estimations, and performance trends to stay ahead in the NFT market.",
  },
  {
    title: "Customizable Alerts and Notifications",
    icon: rasters.notification,
    description:
      "Set up personalized alerts for significant transactions, price changes, or portfolio value milestones. Never miss an important update with our real-time notifications.",
  },
];

const Feature = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center">Features</h2>
      <p className="text-sm text-gray-400 mt-2 text-center">
        best cryptocurrency portfolio management tool for your needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 lg:px-32 md:px-20">
        {FeaturesData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col rounded-3xl border border-gray-100 p-6 bg-gradient-to-br from-white via-white to-primary/5"
          >
            <div>
              <Image
                src={feature.icon}
                alt="feature icon"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-xl font-bold mb-2 mt-4">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
