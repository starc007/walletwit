import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tokenAddress } = req.body;

  const commaSeparatedTokenAddresses = tokenAddress.join(",");
  const url = `https://price.jup.ag/v6/price?ids=${commaSeparatedTokenAddresses}`;
  try {
    const response = await fetch(url);
    console.log("response", response);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
}
