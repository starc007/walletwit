import { useDataContext } from "@/context/DataContext";
import { formatLamports, shortenAddress } from "@/utils/utils";
import { useWallet } from "@jup-ag/wallet-adapter";
import Link from "next/link";
import { FC } from "react";

interface ITransactionTable {
  transactions: ITransaction[];
}

const clrs: Record<string, { bg: string; text: string }> = {
  COMPRESSED_NFT_MINT: {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  SWAP: {
    bg: "bg-green-100",
    text: "text-green-700",
  },
  TRANSFER: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  UNKNOWN: {
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
};

const TransactionTable: FC<ITransactionTable> = ({ transactions }) => {
  const { publicKey } = useWallet();
  const { nftData } = useDataContext();
  return (
    <div className="px-4 sm:px-0">
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-100 rounded-xl">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      fee
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      change
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      source
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      tx
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.length > 0 &&
                    transactions.map((tr, idx) => (
                      <tr key={idx}>
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 w-96">
                          <div
                            className={`flex-shrink-0 text-xs w-min px-3 py-1 rounded-md ${
                              clrs[tr.type]?.bg || "bg-gray-100"
                            } ${clrs[tr.type]?.text || "text-gray-700"}`}
                          >
                            {tr.type}
                          </div>
                          {tr.description.includes(publicKey?.toString()!) ? (
                            <div className="font-medium mt-1">
                              {tr.description.split(publicKey?.toString()!)[1]}
                            </div>
                          ) : null}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs text-primaryLight">
                          {new Date(tr.timestamp * 1000).toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-primaryLight w-32">
                          ${" "}
                          {(
                            (tr.fee / 10 ** 9) *
                            nftData?.nativeBalance?.price_per_sol
                          ).toFixed(4)}
                        </td>
                        {tr.nativeBalanceChange === 0 ? (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-primaryLight">
                            -
                          </td>
                        ) : (
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm w-20 ${
                              tr.nativeBalanceChange > 0
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {tr.nativeBalanceChange > 0
                              ? "+"
                              : tr.nativeBalanceChange < 0
                              ? "-"
                              : ""}{" "}
                            $
                            {(
                              (Math.abs(tr.nativeBalanceChange) / 10 ** 9) *
                              nftData?.nativeBalance?.price_per_sol
                            ).toFixed(4)}
                          </td>
                        )}
                        <td className="whitespace-nowrap px-3 py-4 text-xs text-primaryLight">
                          {tr.source}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs text-primaryLight">
                          <Link
                            href={`https://solscan.io/tx/${tr.signature}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-500 underline "
                          >
                            {shortenAddress(tr.signature)}
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
