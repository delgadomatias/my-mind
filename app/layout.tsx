import { Providers } from "@/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Mind",
  description: "My Mind application for personal knowledge management",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-[#F0F2F5] light">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
