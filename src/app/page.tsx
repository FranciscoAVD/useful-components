import Calendars from "@/features/calendars/calendars";
import FileTree from "@/features/trees/file-tree";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <Calendars />
        <FileTree />
      </div>
    </main>
  );
}
