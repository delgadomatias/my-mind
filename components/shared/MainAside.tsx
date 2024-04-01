import { getUser } from "@/utils/getUser";
import { Logout } from "../features/auth/Logout";

export const MainAside = async () => {
  const user = await getUser();
  if (!user) return;
  const { avatar_url } = user.user_metadata as { avatar_url: string };

  return (
    <aside className="fixed hidden h-screen w-20 flex-col items-center justify-between lg:flex ">
      <div className="mt-[calc(100px_+_2rem)]">
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
        <Logout />
      </div>
    </aside>
  );
};
