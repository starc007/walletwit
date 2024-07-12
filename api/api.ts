export const getAllNFTs = async (address: string) => {
  try {
    const response = await fetch("/api/getAllUserNFT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey: address,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getAllTokens = async (address: string) => {
  try {
    const response = await fetch("/api/getAllUserTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicKey: address,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
