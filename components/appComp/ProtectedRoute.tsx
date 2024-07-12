"use client";

import React, { FC } from "react";
import UnauthorizedState from "./UnauthorizedState";
import { useWallet } from "@jup-ag/wallet-adapter";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return <UnauthorizedState />;
  }

  return children;
};

export default ProtectedRoute;
