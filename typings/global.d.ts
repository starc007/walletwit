export declare global {
  interface NftData {
    items: any;
    limit: number;
    grand_total: number;
    page: number;
    total: number;
  }
  interface ITokenAccount {
    address: string;
    mint: string;
    owner: string;
    amount: number;
    delegated_amount: number;
    frozen: boolean;
  }
  interface TokenData {
    token_accounts: ITokenAccount[];
    limit: number;
    page: number;
    total: number;
  }

  interface DataContextProps {
    nftData: NftData;
    tokensData: TokenData;
  }
}
