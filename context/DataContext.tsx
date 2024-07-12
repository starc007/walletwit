/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getAllNFTs, getAllTokens } from "@/api/api";

export const initialState: DataContextProps = {
  nftData: {
    grand_total: 0,
    items: [],
    limit: 10,
    page: 1,
    total: 0,
  },
  tokensData: {
    limit: 10,
    page: 1,
    total: 0,
    token_accounts: [],
  },
};

export const DataContext = createContext<DataContextProps>(initialState);

export const DataContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { publicKey } = useWallet();
  const [nftData, setNftData] = useState<NftData>(initialState.nftData);
  const [tokensData, setTokensData] = useState<any>(initialState.tokensData);
  const isFetched = useRef(false);

  const parallelFetch = async () => {
    const [nftData, tokensData] = await Promise.all([
      getAllNFTs(publicKey?.toString()!),
      getAllTokens(publicKey?.toString()!),
    ]);

    console.log("nftData", nftData);
    console.log("tokensData", tokensData);

    setNftData(nftData);
    setTokensData(tokensData);
  };

  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;

      parallelFetch();
    }
  }, [isFetched, publicKey]);

  return (
    <DataContext.Provider value={{ nftData, tokensData }}>
      {children}
    </DataContext.Provider>
  );
};
