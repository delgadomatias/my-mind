import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Providers } from "../Providers";
import { NoteSection } from "../components/shared/NoteSection";
import "./../globals.css";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

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
      <body className={nunito.className}>
        <main>
          <Providers>
            <NoteSection />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
