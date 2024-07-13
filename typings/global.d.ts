export declare global {
  interface NftData {
    items: any;
    limit: number;
    grand_total: number;
    page: number;
    total: number;
    nativeBalance: {
      lamports: number;
      price_per_sol: number;
      total_price: number;
    };
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

  interface IToken {
    name: string;
    symbol: string;
    logo: string;
    amount: number;
    address: string;
    decimals: number;
  }

  interface INFT {
    name: string;
    description: string;
    image: string;
    id: string;
    creators: {
      address: string;
      verified: boolean;
      share: number;
    }[];
    royaltyPercentage: number;
  }
}
