import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketing Tweets Repository",
  description:
    "A curated collection of the best marketing insights from Twitter. Filter, search, and discover strategies that work.",
  keywords: [
    "marketing",
    "tweets",
    "social media",
    "SEO",
    "content marketing",
    "copywriting",
    "analytics",
    "paid ads",
    "email marketing",
  ],
  authors: [{ name: "Marketing Tweets Repo" }],
  openGraph: {
    title: "Marketing Tweets Repository",
    description:
      "A curated collection of the best marketing insights from Twitter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Tweets Repository",
    description:
      "A curated collection of the best marketing insights from Twitter.",
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
