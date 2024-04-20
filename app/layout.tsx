import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/apollo-wrapper";
import "./globals.css";

import classNames from 'clsx';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magical Trip Planner",
  description: "Create, manage and share your Disney World trip plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='h-full bg-gray-50' lang="en">
      <body className={classNames(inter.className, 'h-full')}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
