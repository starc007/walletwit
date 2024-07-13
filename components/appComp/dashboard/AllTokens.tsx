import { getTokenInfo } from "@/api/api";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect } from "react";
import BarLoader from "../common/BarLoader";
import Image from "next/image";
import { rasters } from "@/assets";
import TokenTable from "./TokenTable";

const AllTokens = () => {
  const { tokensData } = useDataContext();
  const [loader, setLoader] = React.useState(false);
  const [tokensInfo, setTokensInfo] = React.useState<IToken[] | []>([]);

  const getTokensInfo = async (mintAddress: string[]) => {
    setLoader(true);
    const response = await getTokenInfo(mintAddress);
    setLoader(false);
    if (response) {
      console.log("response", response);
      const tokensInfo = response.map((token: any) => {
        const amount = tokensData.token_accounts.find(
          (tokenAccount) => tokenAccount.mint === token.account
        )?.amount;

        if (
          !token.offChainMetadata?.metadata?.name ||
          token.onChainMetadata.error === "EMPTY_ACCOUNT"
        ) {
          return;
        }
        return {
          name: token.offChainMetadata.metadata.name,
          symbol: token.offChainMetadata.metadata.symbol,
          logo: token.offChainMetadata.metadata.image,
          amount: amount,
          address: token.account,
          decimals:
            token?.onChainAccountInfo?.accountInfo?.data?.parsed?.info
              ?.decimals,
        };
      });

      const filteredTokens = tokensInfo.filter((token: any) => token);
      setTokensInfo(filteredTokens);
    }
  };

  useEffect(() => {
    if (tokensData?.token_accounts.length > 0) {
      const allMintAddress = tokensData.token_accounts.map(
        (token) => token.mint
      );
      getTokensInfo(allMintAddress);
    }
  }, [tokensData]);

  return loader ? (
    <div className="mt-5">
      <BarLoader />
    </div>
  ) : (
    <div className="mt-1">
      {tokensInfo.length > 0 ? (
        <>
          <p className="text-sm text-primaryLight/50 font-medium">
            {tokensData.total} coins in your wallet
          </p>
          <div className="mt-6">
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
