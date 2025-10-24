import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import GlobalWrapper from "@/components/global-wrapper";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs'

const rubik = Rubik({
  variable: "--font-rubik"

});

export const metadata: Metadata = {
  title: "Pet Project: Pets of the internet",
  description: "Follow all your favourite animals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${rubik.variable}`}>
          <GlobalWrapper>
            <Header />
            {children}
          </GlobalWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
