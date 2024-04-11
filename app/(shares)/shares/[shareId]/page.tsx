import { ExpiredShare } from "@/components/features/shares/ExpiredShare";
import { IntervalUntilExpiration } from "@/components/features/shares/IntervalUntilExpiration";
import { MotionDiv } from "@/components/shared/MotionDiv";
import ReadonlyMarkdownEditor from "@/components/shared/markdown-editor/ReadonlyMarkdownEditor";
import { getDbOnServerComponent } from "@/database/server";
import { ShareResponse } from "@/interfaces/shares.interface";
import { getClassesByTags } from "@/utils";
import { isExpiredDate } from "@/utils/isExpiredDate";

interface Props {
  params: {
    shareId: string;
  };
}

const ShareDetailsPage = async ({ params }: Props) => {
  const { shareId } = params;
  const supabase = await getDbOnServerComponent();
  const { data } = (await supabase
    .from("Share")
    .select("*, Note(*)")
    .eq("id", shareId)
    .single()) as {
    data: ShareResponse;
  };

  if (!data) {
    return <ExpiredShare />;
  }

  const sharedExpirationDate = new Date(data.expiration_date);
  const sharedIsExpired = isExpiredDate(sharedExpirationDate);

  if (sharedIsExpired) {
    return <ExpiredShare />;
  }

  const { Note: foundNote } = data;
  const classesByTagToApply = getClassesByTags(foundNote.tags);
  const { data: noteUser } = await supabase
    .from("User")
    .select("name")
    .eq("id", foundNote.user_id)
    .single();

  return (
    <article
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden
    after:absolute after:bottom-[-80px] after:left-0 after:h-[350px] after:w-full after:bg-[url('https://static.accelerator.net/134/0.28.7/shares/images/bottom-gradient-mobile.png')] after:bg-cover after:bg-center after:bg-no-repeat after:content-['']
    md:after:bg-none
    
    "
    >
      <MotionDiv
        className="mx-auto h-[450px] w-full max-w-screen-lg grid-cols-12 px-8 md:grid"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`w-full bg-white md:col-span-5 ${classesByTagToApply} grid place-content-center rounded-md px-4 py-12`}
        >
          <ReadonlyMarkdownEditor content={foundNote.content} />
        </div>
        <div className="my-4 flex w-full flex-col items-center justify-center gap-8 rounded-md rounded-bl-none rounded-tl-none md:col-span-7 lg:bg-[#e7ecf4]">
          <div className="flex flex-col items-center">
            <h1 className="line-clamp-3 font-louize text-4xl tracking-[-0.01em] text-black">
              {foundNote.title}
            </h1>
            <p className="text-center font-normal tracking-[-0.02em] text-[#748297] lg:text-start lg:text-lg">
              Shared from the mind of {noteUser?.name}
            </p>
          </div>
          <div className="inline-flex items-center gap-1 text-sm text-[#748297] lg:text-base">
            <span>This memory goes private in</span>
            <IntervalUntilExpiration expirationDate={sharedExpirationDate} />
          </div>
        </div>
      </MotionDiv>
    </article>
  );
};

export default ShareDetailsPage;
