import type { Metadata } from "next";
import ProtectedRoute from "@/components/appComp/ProtectedRoute";
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
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
