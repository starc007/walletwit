import React, { FC } from "react";
import UnauthorizedState from "./UnauthorizedState";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <UnauthorizedState />;
  }

  return <div className="">{children}</div>;
};

export default ProtectedRoute;
