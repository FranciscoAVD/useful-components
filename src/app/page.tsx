import Calendars from "@/components/calendars/calendars";
import FileTree from "@/components/trees/file-tree";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-10 space-y-20">
        <Calendars />
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">Tree Components</h2>
          <FileTree />
        </section>
        
      </div>
    </main>
  );
}
