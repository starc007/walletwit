import React, { useEffect } from "react";
import BarLoader from "../common/BarLoader";
import { rasters } from "@/assets";
import Image from "next/image";
import { useWallet } from "@jup-ag/wallet-adapter";
import { getAllTransactions } from "@/api/api";
import TransactionTable from "./TransactionTable";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import { useDataContext } from "@/context/DataContext";
import { MONTH_SHORT } from "@/utils/utils";

const CustomizedToolTip = (props: any) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="glass_bg px-3 py-2 rounded-xl shadow-md border border-white/10">
        <p className="text-primaryBlue font-medium">
          {payload[0]?.payload?.name}
        </p>
        <p className="text-primaryLight font-medium mt-3">
          <span className="text-zinc-400 mr-1">$</span>
          {`${payload[0].payload.value}`}
        </p>
        <p className="text-primaryLight font-medium mt-3">
          {`${payload[0].payload.dateTime}`}
        </p>
      </div>
    );
  }

  return null;
};

const AllTransactions = () => {
  const { publicKey } = useWallet();
  const { nftData } = useDataContext();
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

  const charData = transaction?.map((tr) => {
    return {
      name: tr.type,
      value: `${(
        (tr.nativeBalanceChange / 10 ** 9) *
        nftData?.nativeBalance?.price_per_sol
      ).toFixed(4)}`,
      dateTime: `${new Date(tr.timestamp * 1000).getDate()} ${
        MONTH_SHORT[new Date(tr.timestamp * 1000).getMonth()]
      }`,
    };
  });

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
          <div className="mt-2 w-full">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                width={450}
                height={250}
                data={charData}
                stackOffset="expand"
              >
                {/* <CartesianGrid stroke="#000" strokeDasharray="4 4" /> */}
                <XAxis
                  dataKey="dateTime"
                  fontSize={12}
                  interval={4}
                  allowDataOverflow
                />
                {/* <YAxis dataKey="value" fontSize={12} tickLine={false} /> */}
                <Tooltip content={<CustomizedToolTip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1d1d1d"
                  strokeWidth={1}
                  dot={{ r: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-20">
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
