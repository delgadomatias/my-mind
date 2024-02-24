import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NoteSection } from "../components/NoteSection";
import "./../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Mind",
  description: "My Mind application for personal knowledge management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F0F2F5]">
      <body className={inter.className}>
        <main>
          <NoteSection />
          {children}
        </main>
      </body>
    </html>
  );
}
