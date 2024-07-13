import { heliusServerClient } from "@/utils/helius/serverClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.body;
  try {
    const response = await heliusServerClient.rpc.getAssetsByOwner({
      ownerAddress: publicKey?.toString()!,
      page: 1,
      limit: 30,
      displayOptions: {
        showGrandTotal: true,
        showNativeBalance: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
