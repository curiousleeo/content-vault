import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Marketing Tweet Vault",
  description:
    "Real advice from real builders. The best Web3 marketing insights, curated by the community. Filter, search, upvote.",
  keywords: [
    "marketing",
    "web3 marketing",
    "crypto marketing",
    "tweets",
    "community",
    "personal branding",
    "copywriting",
    "growth",
    "content strategy",
  ],
  authors: [{ name: "Marketing Tweet Vault" }],
  openGraph: {
    title: "The Marketing Tweet Vault",
    description: "Real advice from real builders. Web3 marketing wisdom, curated by the community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marketing Tweet Vault",
    description: "Real advice from real builders. Web3 marketing wisdom, curated by the community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
