import React, { useEffect } from "react";
import BarLoader from "../common/BarLoader";
import { rasters } from "@/assets";
import Image from "next/image";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getAllTransactions } from "@/api/api";
import TransactionTable from "./TransactionTable";

const AllTransactions = () => {
  const { publicKey } = useWallet();
  const [transaction, setTransaction] = React.useState<ITransaction[] | []>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getTransaction = async () => {
    setLoading(true);
    const response = await getAllTransactions(publicKey?.toString()!);
    setLoading(false);
    if (response) {
      const transaction = response.map((transaction: any) => {
        const findChange = transaction.accountData.find(
          (accountData: any) => accountData.account === publicKey?.toString()
        );
        return {
          signature: transaction.signature,
          timestamp: transaction.timestamp,
          type: transaction.type,
          fee: transaction.fee,
          source: transaction.source,
          nativeBalanceChange: findChange?.nativeBalanceChange,
          description: transaction.description,
        };
      });
      setTransaction(transaction);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [publicKey]);

  return loading ? (
    <div className="mt-5">
      <BarLoader />
    </div>
  ) : (
    <div className="mt-1">
      {transaction.length > 0 ? (
        <>
          <h2 className="text-xl font-medium text-primary/50">
            Transaction History
          </h2>
          <p className="text-primaryLight/40 font-medium text-sm">
            Only showing the last 50 transactions.
          </p>
          <div className="mt-2">
            <TransactionTable transactions={transaction} />
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto flex flex-col items-center justify-center border-2 border-gray-100 bg-gray-50 rounded-2xl h-48 mt-10">
          <Image src={rasters.transaction} alt="coin" className="w-16 h-16" />
          <p className="text-primaryLight font-medium mt-5 text-lg">
            No transactions in your wallet
          </p>
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
