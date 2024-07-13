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
import { getAllNFTs, getAllTokens } from "@/api/api";

interface DataContextProps {
  nftData: NftData;
  tokensData: TokenData;
  isLoading: boolean;
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

  const parallelFetch = async () => {
    setIsLoading(true);
    const [nftData, tokensData] = await Promise.all([
      getAllNFTs(publicKey?.toString()!),
      getAllTokens(publicKey?.toString()!),
    ]);
    setIsLoading(false);

    console.log("nftData", nftData);
    console.log("tokensData", tokensData);

    if (nftData) {
      setNftData(nftData);
    }
    if (tokensData) {
      setTokensData(tokensData);
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
    <DataContext.Provider value={{ nftData, tokensData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
