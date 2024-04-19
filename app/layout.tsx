import { Providers } from "@/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Toaster } from "sonner";

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
    <html lang="en" className="h-full w-full bg-[#F0F2F5] light">
      <body className={`${nunito.className} min-h-[calc(100%_-_2rem)] w-full`}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
