import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.body;
  const key = process.env.NEXT_PUBLIC_HELIUS_KEY;
  const url = `https://api.helius.xyz/v0/addresses/${publicKey?.toString()!}/transactions?api-key=${key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
