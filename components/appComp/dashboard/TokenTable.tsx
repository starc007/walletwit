import { FC } from "react";
import BarLoader from "../common/BarLoader";
import Image from "next/image";
import { formatNumber, shortenAddress } from "@/utils/utils";

interface ITokenTable {
  tokens: IToken[];
  loading?: boolean;
}

const TokenTable: FC<ITokenTable> = ({ tokens, loading }) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-100 md:rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      symbol
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {/* If loading is true, show loading spinner */}
                  {loading && (
                    <tr>
                      <td colSpan={4}>
                        <BarLoader />
                      </td>
                    </tr>
                  )}

                  {/* If users is empty, show no data */}
                  {!loading && tokens.length === 0 && (
                    <tr>
                      <td colSpan={4}>
                        <div className="flex justify-center items-center p-4">
                          <p className="text-gray-500">No data found</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    tokens.length > 0 &&
                    tokens.map((token, idx) => {
                      const amt = Math.floor(
                        token?.amount / 10 ** token?.decimals
                      );

                      if (amt === 0) return;

                      return (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={token?.logo}
                                alt="token"
                                width={32}
                                height={32}
                              />
                              <div className="ml-4">
                                <div className="font-medium">{token?.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            {token?.symbol}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            {formatNumber(token?.amount, token?.decimals)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                            {shortenAddress(token?.address)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm text-gray-700">
              Page {currentPage} of {totalPage}
            </p>
          </div>
          <div>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className="ml-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TokenTable;
