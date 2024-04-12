import { IntervalUntilExpiration } from "./IntervalUntilExpiration";

interface Props {
  expirationDate: Date;
}

export const ShareFooter = ({ expirationDate }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-sm 2xl:text-base">
      <div className="inline-flex items-center gap-1">
        <span>This memory goes private in</span>
        <IntervalUntilExpiration expirationDate={expirationDate} />
      </div>
      <span>Save it to your mind to keep it.</span>
    </div>
  );
};
