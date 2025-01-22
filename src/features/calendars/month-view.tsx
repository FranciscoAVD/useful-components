"use client";

import {
  startOfToday,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  format,
  isEqual,
  isSameMonth,
  addMonths
} from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const daysOfTheWeek = ["S", "M", "T", "W", "T", "F", "S"]
export default function MonthView() {
  const today = startOfToday();
  const [selected, setSelected] = useState(today);
  const [firstOfMonth, setFirstOfMonth] = useState(startOfMonth(today));
  const daysOfTheMonth: Date[] = eachDayOfInterval({
    start: startOfWeek(firstOfMonth),
    end: endOfWeek(endOfMonth(firstOfMonth)),
  });

  //mutations
  function previousMonth(){
    setFirstOfMonth(prev => addMonths(prev, -1))
  }
  function nextMonth(){
    setFirstOfMonth(prev => addMonths(prev, 1))
  }
  return (
    <div
      aria-label="Calendar"
      className="flex flex-col min-w-[300px] h-fit border rounded-xl shadow-md"
    >
      <section className="flex items-center justify-between p-2">
        <button className="flex items-center justify-center size-8 hover:bg-neutral-100 rounded-md" onClick={previousMonth}>
          <ChevronLeftIcon className="size-4" aria-hidden />{" "}
          <span className="sr-only">Previous Month</span>
        </button>
        <h2 className="text-lg font-semibold">
          {format(firstOfMonth, "MMMM yyyy")}
        </h2>
        <button className="flex items-center justify-center size-8 hover:bg-neutral-100 rounded-md" onClick={nextMonth}>
          <ChevronRightIcon className="size-4" aria-hidden />{" "}
          <span className="sr-only">Next Month</span>
        </button>
      </section>
      <section className="grid grid-cols-7 text-sm">
        {daysOfTheWeek.map((w,idx) => <div key={w+idx} className="flex items-center justify-center text-xs font-light">{w}</div>)}
        {daysOfTheMonth.map((d) => (
          <div key={d.toDateString()} className="aspect-square p-2">
            <button className={cn("h-full w-full rounded-full", !isSameMonth(d, firstOfMonth) && "text-neutral-300", isEqual(d, today) && "text-blue-500", isEqual(d, selected) && "bg-neutral-900 text-neutral-50")}
            onClick={()=>setSelected(d)}>
              {format(d, "d")}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
