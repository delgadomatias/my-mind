import ReadonlyMarkdownEditor from "@/components/shared/markdown-editor/ReadonlyMarkdownEditor";
import { getDbOnServerComponent } from "@/database/server";
import { ShareResponse } from "@/interfaces/shares.interface";
import { getClassesByTags } from "@/utils";

interface Props {
  params: {
    shareId: string;
  };
}

const ShareDetailsPage = async ({ params }: Props) => {
  const { shareId } = params;
  const supabase = await getDbOnServerComponent();
  const { data } = (await supabase
    .from("Shares")
    .select("*, Notes(*)")
    .eq("id", shareId)
    .single()) as {
    data: ShareResponse;
  };

  const { Notes: foundNote } = data;
  const classesByTagToApply = getClassesByTags(foundNote.tags);

  return (
    <article
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden
    after:absolute after:bottom-[-80px] after:left-0 after:h-[350px] after:w-full after:bg-[url('https://static.accelerator.net/134/0.28.7/shares/images/bottom-gradient-mobile.png')] after:bg-cover after:bg-center after:bg-no-repeat after:content-['']
    md:after:bg-none
    
    "
    >
      <section className="mx-auto h-[450px] w-full max-w-screen-lg grid-cols-12 px-8 md:grid">
        <div
          className={`w-full bg-white md:col-span-5 ${classesByTagToApply} grid place-content-center rounded-md px-4 py-12`}
        >
          <ReadonlyMarkdownEditor content={foundNote.content} />
        </div>
        <div className="my-4 flex w-full flex-col items-center justify-center rounded-md rounded-bl-none rounded-tl-none bg-[#e7ecf4] md:col-span-7">
          <h1 className="line-clamp-3 font-louize text-4xl tracking-[-0.01em] text-black">
            {foundNote.title}
          </h1>
          <p className="text-lg font-normal tracking-[-0.02em] text-[#748297]">
            Shared from the mind of Matias
          </p>
        </div>
      </section>
    </article>
  );
};

export default ShareDetailsPage;
