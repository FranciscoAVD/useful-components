import DateRange from "./date-range";
import MonthView from "./month-view";

export default function Calendars(){
    return (
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">Calendar Components</h2>
          <div className="flex gap-4">
            <MonthView />
            <DateRange />
          </div>
        </section>
    )
}