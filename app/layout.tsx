"use client";

// import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/appComp/Navbar";
import { GeistSans } from "geist/font/sans";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import { walletConfig } from "@/utils/walletConfig";

// export const metadata: Metadata = {
//   title: "walletwit: Your account analytics",
//   description:
//     "Your account analytics, built with Next.js, TypeScript, and Tailwind CSS.",
//   icons: {
//     icon: "/icon.png",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>walletwit: Your account analytics</title>
        <meta
          name="description"
          content="Your account analytics, built with Next.js, TypeScript, and Tailwind CSS."
        />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={GeistSans.className}>
        <UnifiedWalletProvider wallets={[]} config={walletConfig as any}>
          <Navbar />
          <main className="container mx-auto">{children}</main>
        </UnifiedWalletProvider>
      </body>
    </html>
  );
}
