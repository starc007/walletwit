import { heliusServerClient } from "@/utils/helius/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenInfo } from "../../api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenAddress } = req.body;
  const key = process.env.NEXT_PUBLIC_HELIUS_KEY;
  const url = `https://api.helius.xyz/v0/token-metadata/?api-key=${key}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mintAccounts: tokenAddress,
        includeOffChain: true,
      }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
