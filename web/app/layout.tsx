import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "CyberAi - AI-Powered Smart Contract Security",
  description: "Advanced AI-powered security platform for smart contract auditing and blockchain security. Automated scanning, vulnerability detection, and comprehensive governance tools.",
  keywords: ["blockchain", "security", "smart contracts", "AI", "auditing", "crypto"],
  authors: [{ name: "CyberAi Team" }],
  openGraph: {
    title: "CyberAi - AI-Powered Smart Contract Security",
    description: "Advanced AI-powered security platform for blockchain development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased digital-grid">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
