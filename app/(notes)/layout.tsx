import { DragAndDrop } from "@/components/features/drag-and-drop/DragAndDrop";
import { MainAside } from "@/components/shared/MainAside";
import { NoteSection } from "@/components/shared/NoteSection";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Mind",
  description: "My Mind application for personal knowledge management",
};

interface NotesLayoutProps {
  children: React.ReactNode;
}

export default function NotesLayout({ children }: NotesLayoutProps) {
  return (
    <main className="overflow-hidden">
      <MainAside />
      <NoteSection />
      <DragAndDrop />
      {children}
    </main>
  );
}
