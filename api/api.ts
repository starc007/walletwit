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

export const getAllTransactions = async (address: string) => {
  try {
    const response = await fetch("/api/getAllUserTransaction", {
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

export const getTokenInfo = async (tokenAddress: string[]) => {
  try {
    const response = await fetch("/api/getTokenInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenAddress: tokenAddress,
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

export const getTokenPrice = async (tokenAddress: string[]) => {
  try {
    const response = await fetch("/api/getTokenPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenAddress: tokenAddress,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    }
    return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
