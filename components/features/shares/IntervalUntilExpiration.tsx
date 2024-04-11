"use client";

import { intervalToDuration } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  expirationDate: Date;
}

export const IntervalUntilExpiration = ({ expirationDate }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeFormatted, setTimeFormatted] = useState("24h 00min 00sec");
  const router = useRouter();

  useEffect(() => {
    function handleInterval() {
      const { hours, minutes, seconds } = intervalToDuration({
        start: new Date(),
        end: expirationDate,
      });

      setHours(hours || 0);
      setMinutes(minutes || 0);
      setSeconds(seconds || 0);

      const zeroPad = (num: number) => String(num).padStart(2, "0");
      const timeFormatted = `${zeroPad(hours || 0)}h ${zeroPad(minutes || 0)}min ${zeroPad(seconds || 0)}sec`;

      setTimeFormatted(timeFormatted);
    }

    const interval = setInterval(handleInterval, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [expirationDate]);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      router.refresh();
    }
  }, [hours, seconds, minutes, router]);

  return (
    <time
      dateTime={expirationDate.toString()}
      className="font-semibold  underline"
    >
      {timeFormatted}
    </time>
  );
};
