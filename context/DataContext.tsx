/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWallet } from "@jup-ag/wallet-adapter";
import {
  getAllNFTs,
  getAllTokens,
  getTokenInfo,
  getTokenPrice,
} from "@/api/api";

interface DataContextProps {
  nftData: NftData;
  tokensData: TokenData;
  isLoading: boolean;
  tokensPrices: Record<string, ITokenPrice>;
  loader: boolean;
  tokensInfo: IToken[];
}

export const initialState: DataContextProps = {
  nftData: {
    grand_total: 0,
    items: [],
    limit: 10,
    page: 1,
    total: 0,
    nativeBalance: {
      lamports: 0,
      price_per_sol: 0,
      total_price: 0,
    },
  },
  tokensData: {
    limit: 10,
    page: 1,
    total: 0,
    token_accounts: [],
  },
  isLoading: false,
  tokensPrices: {},
  loader: false,
  tokensInfo: [],
};

export const DataContext = createContext<DataContextProps>(initialState);
export const useDataContext = () => useContext(DataContext);

export const DataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { publicKey } = useWallet();
  const [nftData, setNftData] = useState<NftData>(initialState.nftData);
  const [tokensData, setTokensData] = useState<any>(initialState.tokensData);
  const [isError, setIsError] = useState(false);
  const isFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [tokensPrices, setTokensPrices] = useState<Record<string, ITokenPrice>>(
    {}
  );
  const [tokensInfo, setTokensInfo] = useState<IToken[] | []>([]);

  const getTokensInfo = async (data: any, tokensDataInfo: any) => {
    if (data) {
      const tokensInfo = data.map((token: any) => {
        const amount = tokensDataInfo.token_accounts.find(
          (tokenAccount: any) => tokenAccount.mint === token.account
        )?.amount;

        return {
          name: token.offChainMetadata?.metadata?.name || "-",
          symbol: token.offChainMetadata?.metadata?.symbol || "-",
          logo:
            token.offChainMetadata?.metadata?.image ||
            "https://placehold.co/200x200",
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

  const parallelFetch = async () => {
    setIsLoading(true);
    const [nftData, tokensDataInfo] = await Promise.all([
      getAllNFTs(publicKey?.toString()!),
      getAllTokens(publicKey?.toString()!),
    ]);
    setIsLoading(false);

    if (nftData) {
      setNftData(nftData);
    }
    if (tokensInfo) {
      setTokensData(tokensData);

      if (tokensDataInfo?.token_accounts.length > 0) {
        const allMintAddress = tokensDataInfo.token_accounts.map(
          (token: any) => token.mint
        );
        setLoader(true);
        const [prices, info] = await Promise.all([
          getTokenPrice(allMintAddress),
          getTokenInfo(allMintAddress),
        ]);
        setLoader(false);
        if (prices) {
          setTokensPrices(prices);
        }
        if (info) {
          getTokensInfo(info, tokensDataInfo);
        }
      }
    }

    if (!nftData && !tokensData) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;

      parallelFetch();
    }
  }, [isFetched, publicKey]);

  return (
    <DataContext.Provider
      value={{
        nftData,
        tokensData,
        isLoading,
        tokensPrices,
        loader,
        tokensInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
