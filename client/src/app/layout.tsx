import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Roast Me 🔥 | Get Roasted by AI Comedy",
  description:
    "A hilarious voice AI that roasts you like a stand-up comedian. Dare to get roasted?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-club-dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
