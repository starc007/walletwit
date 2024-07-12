import { Helius } from "helius-sdk";

export const heliusServerClient = new Helius(
  process.env.NEXT_PUBLIC_HELIUS_KEY!
);
