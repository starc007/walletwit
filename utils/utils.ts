export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatLamports(lamports: number): string {
  return (lamports / 1000000000).toFixed(2);
}
