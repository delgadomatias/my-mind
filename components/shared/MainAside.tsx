import { getUser } from "@/utils/getUser";
import { Image } from "@nextui-org/image";

export const MainAside = async () => {
  const user = await getUser();
  const { avatar_url } = user?.user_metadata as { avatar_url: string };

  return (
    <aside className="fixed flex h-full w-20 flex-col items-center justify-between">
      <div></div>
      <h1
        className="text-2xl text-[#748297]"
        style={{
          writingMode: "vertical-rl",
        }}
      >
        My Mind
      </h1>
      <div>
        <Image
          alt={`Image of ${user?.user_metadata.name}`}
          height={50}
          src={avatar_url}
          width={50}
          className="object-cover"
        />
      </div>
      <div></div>
    </aside>
  );
};
