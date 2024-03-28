import { getUser } from "@/utils/getUser";
import { Image } from "@nextui-org/image";
import { Logout } from "../features/auth/Logout";

export const MainAside = async () => {
  const user = await getUser();
  if (!user) return;
  const { avatar_url } = user.user_metadata as { avatar_url: string };

  return (
    <aside className="fixed hidden h-screen w-20 flex-col items-center justify-between lg:flex ">
      <div className="mt-[100px]">
        <h1
          className="text-2xl text-[#748297]"
          style={{
            writingMode: "vertical-rl",
          }}
        >
          My Mind
        </h1>
      </div>

      <div className="mb-16 flex flex-col items-center gap-4">
        <Image
          alt={`Image of ${user?.user_metadata.name}`}
          height={45}
          src={avatar_url}
          width={45}
          className="object-cover"
        />
        <Logout />
      </div>
    </aside>
  );
};
