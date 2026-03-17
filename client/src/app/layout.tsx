import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/layout/Header";
import ReduxProvider from "@/components/providers/ReduxPrpoviders";
import Sidebar from "@/components/layout/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deep Work Timer",
  description: "Focus productivity timer with Pomodoro technique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReduxProvider>
          <QueryProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64">
                <Header />
                <main className="p-8">{children}</main>
              </div>
            </div>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
