import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/appComp/Navbar";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "walletwit: Your account analytics",
  description:
    "Your account analytics, built with Next.js, TypeScript, and Tailwind CSS.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
