"use client";

import {
  startOfToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isEqual,
  addMonths,
  addDays,
  getDay,
  isBefore,
  isAfter,
} from "date-fns";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useState } from "react";

const daysOfTheWeek = ["S", "M", "T", "W", "T", "F", "S"];

function getColStart(d: Date): string {
  const dayIndex = getDay(d);
  switch (dayIndex) {
    case 1:
      return "col-start-2";
    case 2:
      return "col-start-3";
    case 3:
      return "col-start-4";
    case 4:
      return "col-start-5";
    case 5:
      return "col-start-6";
    case 6:
      return "col-start-7";
    default:
      return "";
  }
}

type TDateRange = {
  start: Date;
  end: Date;
  turn: "start" | "end";
};

export default function DateRange() {
  const today = startOfToday();
  const [firstOfFirstMonth, setFirstOfFirstMonth] = useState(
    startOfMonth(today)
  );

  const firstOfSecondMonth = addMonths(firstOfFirstMonth, 1)

  const [dateRange, setDateRange] = useState<TDateRange>({
    start: today,
    end: addDays(today, 9),
    turn: "start",
  });
  const daysOfFirstMonth: Date[] = eachDayOfInterval({
    start: firstOfFirstMonth,
    end: endOfMonth(firstOfFirstMonth),
  });
  const daysOfSecondMonth: Date[] = eachDayOfInterval({
    start: firstOfSecondMonth,
    end: endOfMonth(firstOfSecondMonth),
  });

  //mutations
  function setNewRange(d: Date): void {
    let turn = dateRange.turn;
    if (turn === "start") {
      setDateRange({ start: d, end: addDays(d, 1), turn: "end" });
    } else {
      if(isEqual(d, dateRange.start)) return;
      if (isBefore(d, dateRange.start))
        setDateRange({ start: d, end: addDays(d, 1), turn: "end" });
      else
        setDateRange((prev) => ({ start: prev.start, end: d, turn: "start" }));
    }
  }
  function previousMonth() {
    setFirstOfFirstMonth((prev) => addMonths(prev, -1));
  }
  function nextMonth() {
    setFirstOfFirstMonth((prev) => addMonths(prev, 1));
  }
  return (
    <div className="p-2 border rounded-xl shadow-md">
      {/*Display date range e.g. Wed 29 - Tue 4*/}
      <section className="flex gap-x-2 text-xl font-semibold">
        <span
          className={cn(
            "inline-block w-[120px] pb-1 border-b-2 border-b-transparent overflow-hidden",
            dateRange.turn === "start" && "border-blue-500"
          )}
        >
          {format(dateRange.start, "EEE, MMM d")}
        </span>{" "}
        <span>
          <ArrowRightIcon className="inline-block size-4" aria-hidden />{" "}
          <span className="sr-only">to</span>
        </span>{" "}
        <span
          className={cn(
            "inline-block w-[120px] pb-1 border-b-2 border-b-transparent overflow-hidden",
            dateRange.turn === "end" && "border-blue-500"
          )}
        >
          {format(dateRange.end, "EEE, MMM d")}
        </span>{" "}
      </section>
      <div className="flex gap-x-4">
        {/*Calendar 1*/}
        <section className="flex flex-col grow">
          <section className="flex items-center justify-between pt-2 pb-4">
            <button className="flex items-center justify-center size-8 hover:bg-neutral-100 rounded-md" onClick={previousMonth}>
              <ChevronLeftIcon className="size-4" aria-hidden />
              <span className="sr-only">Previous month</span>
            </button>
            <h3 className="font-semibold">
              {format(firstOfFirstMonth, "MMMM yyyy")}
            </h3>
            <span className="size-8 invisible"></span>
          </section>
          {/*Grid*/}
          <section className="grid grid-cols-7 gap-y-0.5">
            <DaysOfTheWeek />
            {daysOfFirstMonth.map((d, idx) => (
              <div
                key={d.toDateString()}
                className={cn(
                  "aspect-square",
                  idx === 0 && getColStart(d),
                  isAfter(d, dateRange.start) &&
                    isBefore(d, dateRange.end) &&
                    "bg-blue-200",
                  (isEqual(d, dateRange.start) || isEqual(d, dateRange.end)) &&
                    "bg-blue-200",
                  isEqual(d, dateRange.start) &&
                    "rounded-tl-full rounded-bl-full",
                  isEqual(d, dateRange.end) && "rounded-tr-full rounded-br-full"
                )}
              >
                <button
                  className={cn(
                    "flex items-center justify-center size-12 aspect-square p-1 rounded-full border-2 border-transparent",
                    isEqual(d, today) && "text-blue-500",
                    (isEqual(d, dateRange.start) ||
                      isEqual(d, dateRange.end)) &&
                      "bg-blue-500 text-white",
                    (isBefore(d, dateRange.start) ||
                      isAfter(d, dateRange.end)) &&
                      "hover:border-black"
                  )}
                  onClick={() => setNewRange(d)}
                >
                  <time dateTime={format(d, "yyyy-MM-dd")}>{format(d, "d")}</time>
                </button>
              </div>
            ))}
          </section>
        </section>
        {/*Calendar 2*/}
        <section className="flex flex-col grow">
          <section className="flex items-center justify-between pt-2 pb-4">
            <span className="size-8 invisible"></span>
            <h3 className="font-semibold">
              {format(firstOfSecondMonth, "MMMM yyyy")}
            </h3>
            <button className="flex items-center justify-center size-8 hover:bg-neutral-100 rounded-md" onClick={nextMonth}>
              <ChevronRightIcon className="size-4" aria-hidden />
              <span className="sr-only">Next month</span>
            </button>
          </section>
          {/*Grid*/}
          <section className="grid grid-cols-7 gap-y-0.5">
            <DaysOfTheWeek />
            {daysOfSecondMonth.map((d, idx) => (
              <div
                key={d.toDateString()}
                className={cn(
                  "aspect-square",
                  idx === 0 && getColStart(d),
                  isAfter(d, dateRange.start) &&
                    isBefore(d, dateRange.end) &&
                    "bg-blue-200",
                  (isEqual(d, dateRange.start) || isEqual(d, dateRange.end)) &&
                    "bg-blue-200",
                  isEqual(d, dateRange.start) &&
                    "rounded-tl-full rounded-bl-full",
                  isEqual(d, dateRange.end) && "rounded-tr-full rounded-br-full"
                )}
              >
                <button
                  className={cn(
                    "flex items-center justify-center size-12 aspect-square p-1 rounded-full border-2 border-transparent",
                    isEqual(d, today) && "text-blue-500",

                    (isEqual(d, dateRange.start) ||
                      isEqual(d, dateRange.end)) &&
                      "bg-blue-500 text-white",
                    (isBefore(d, dateRange.start) ||
                      isAfter(d, dateRange.end)) &&
                      "hover:border-black"
                  )}
                  onClick={() => setNewRange(d)}
                >
                  <time dateTime={format(d, "yyyy-MM-dd")}>{format(d, "d")}</time>
                </button>
              </div>
            ))}
          </section>
        </section>
      </div>
    </div>
  );
}

function DaysOfTheWeek() {
  return (
    <>
      {daysOfTheWeek.map((w, idx) => (
        <div
          key={w + idx}
          className="flex items-center justify-center text-xs font-light"
        >
          {w}
        </div>
      ))}
    </>
  );
}
