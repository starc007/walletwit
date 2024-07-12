import React from "react";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { Button } from "../UI";

const UnauthorizedState = () => {
  return (
    <div className="max-w-lg mx-auto h-96 border border-gray-100 mt-20 rounded-3xl py-6 px-12 bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-primary/5 rounded-full p-4 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path fill="currentColor" fillOpacity=".25" d="M15 12h6v4h-6z" />
              <path
                stroke="currentColor"
                strokeWidth="1.2"
                d="M14.25 4h-4.5C6.568 4 4.977 4 3.989 5.004C3 6.008 3 7.624 3 10.857v2.286c0 3.232 0 4.849.989 5.853C4.977 20 6.568 20 9.75 20h4.5c3.182 0 4.773 0 5.762-1.004c.988-1.004.988-2.62.988-5.853v-2.286c0-3.232 0-4.849-.988-5.853C19.023 4 17.432 4 14.25 4Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.2"
                d="M7 8h3"
              />
              <path
                stroke="currentColor"
                strokeWidth="1.2"
                d="M19 16h-2c-.943 0-1.414 0-1.707-.293C15 15.414 15 14.943 15 14c0-.943 0-1.414.293-1.707C15.586 12 16.057 12 17 12h2c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707c0 .943 0 1.414-.293 1.707C20.414 16 19.943 16 19 16Z"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mt-5">
          Your wallet is not connected
        </h1>
        <p className="text-center text-gray-300 mt-4">
          Please connect your wallet to see some magic!
        </p>
        <UnifiedWalletButton
          overrideContent={
            <Button className="mt-5 !h-11">Connect Wallet</Button>
          }
          currentUserClassName="border !rounded-md !h-11"
        />
      </div>
    </div>
  );
};

export default UnauthorizedState;
