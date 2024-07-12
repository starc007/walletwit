import { heliusServerClient } from "@/utils/helius/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.body;
  try {
    const response = await heliusServerClient.rpc.getTokenAccounts({
      owner: publicKey?.toString()!,
      page: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
