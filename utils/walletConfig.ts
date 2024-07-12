import WalletNotification from "@/components/appComp/WalletNotification";

export const walletConfig = {
  autoConnect: false,
  env: "mainnet-beta",
  metadata: {
    name: "UnifiedWallet",
    description: "UnifiedWallet",
    url: "https://jup.ag",
    iconUrls: ["https://jup.ag/favicon.ico"],
  },
  notificationCallback: WalletNotification,
  walletlistExplanation: {
    href: "https://station.jup.ag/docs/additional-topics/wallet-list",
  },
  theme: "light",
  lang: "en",
};
