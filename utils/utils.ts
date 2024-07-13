export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatLamports(lamports: number): string {
  return (lamports / 1000000000).toFixed(2);
}

export function formatNumber(num: number, decimals = 9): string {
  // show number in thousands, millions, billions, trillions
  const number = num / 10 ** decimals;
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(2) + "B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + "K";
  } else {
    return number.toFixed(2);
  }
}

export const MONTH_SHORT: {
  [key: number]: string;
} = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
