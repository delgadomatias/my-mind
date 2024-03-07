import { Image } from "@nextui-org/image";

interface Props {
  src: string;
}

export const PreviewImage = ({ src }: Props) => {
  // TODO: Make this for multiple images
  return (
    <Image
      alt="Image to upload"
      className="h-full !rounded-tr-none !rounded-br-none rounded-xl"
      height={80}
      src={src}
      width={80}
    />
  );
};
