"use client";

import { intervalToDuration } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  expirationDate: Date;
}

type State = {
  hours: number;
  minutes: number;
  seconds: number;
  timeFormatted: string;
};

export const IntervalUntilExpiration = ({ expirationDate }: Props) => {
  const [state, setState] = useState<State>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    timeFormatted: "",
  });
  const router = useRouter();

  useEffect(() => {
    function changeTime() {
      const {
        hours = 0,
        minutes = 0,
        seconds = 0,
      } = intervalToDuration({
        start: new Date(),
        end: expirationDate,
      });

      const zeroPad = (num: number) => String(num).padStart(2, "0");
      const timeFormatted = `${zeroPad(hours)}h ${zeroPad(minutes)}min ${zeroPad(seconds)}sec`;

      setState({ hours, minutes, seconds, timeFormatted });
    }

    changeTime();
    const interval = setInterval(changeTime, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [expirationDate]);

  useEffect(() => {
    const { hours, minutes, seconds } = state;
    const isExpired = hours === 0 && minutes === 0 && seconds === 0;

    if (isExpired) router.refresh();
  }, [state, router]);

  return (
    <time
      dateTime={expirationDate.toString()}
      className="font-semibold  underline"
    >
      {state.timeFormatted}
    </time>
  );
};
