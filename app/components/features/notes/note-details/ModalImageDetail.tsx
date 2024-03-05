import { Note } from "@/app/interfaces";
import { Image } from "@nextui-org/image";
import { usePalette } from "color-thief-react";
import { useEffect, useMemo } from "react";

interface Props {
  note: Note;
}

export const ModalImageDetail = ({ note }: Props) => {
  const imageSrc = useMemo(() => {
    const imgSrcRegex =
      /<img\s+[^>]*?src\s*=\s*(["'])(.*?)\1|<img\s+[^>]*?src\s*=\s*([^ >]*)/;
    const match = note.content.match(imgSrcRegex);
    return match ? (match[2] ? match[2] : match[3]) : "";
  }, [note.content]);

  const { data } = usePalette(imageSrc, 2, "hex", {
    crossOrigin: "Anonymous",
  });

  useEffect(() => {
    if (!data) return;

    const backdropDiv = document.getElementById("backdrop-item");
    if (backdropDiv) {
      backdropDiv.style.backgroundColor = data[0];
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full overflow-x-hidden overflow-y-auto overscroll-behavior-y-contain scrollbar-gutter-stable">
      <Image
        alt="Image"
        className="object-contain w-full h-full aspect-square"
        height={800}
        src={imageSrc}
        width={800}
      />
    </div>
  );
};
