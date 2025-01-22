"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, FileIcon, FolderIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const nodeSchema = z.object({
  name: z.string().min(1),
});
const fileSchema = nodeSchema.extend({
  content: z.string().min(1),
});
type TFile = z.infer<typeof fileSchema>;
export const folderSchema: z.ZodType<{
  name: string;
  children: (TFile | TFolder)[];
}> = nodeSchema.extend({
  children: z.lazy(() => z.array(z.union([fileSchema, folderSchema]))),
});
type TFolder = z.infer<typeof folderSchema>;

type TTree = (TFolder | TFile)[];

const tree: TTree = [
  {
    name: "Folder 1",
    children: [
      {
        name: "Folder 3",
        children: [{ name: "File 2", content: "Some other content" }],
      },
    ],
  },
  { name: "Folder 2", children: [{ name: "Folder 4", children: [] }] },
  { name: "File 1", content: "Some content" },
] as const;

function Li({ node, address }: { node: TFolder | TFile; address: number[] }) {
  //   const file = fileSchema.safeParse(node);
  const folder = folderSchema.safeParse(node);
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        className="flex items-center gap-x-2 h-9 w-full text-left px-2 rounded-md hover:bg-neutral-100"
        onClick={() => {
          if (folder.success) setOpen((prev) => !prev);
        }}
      >
        {folder.success ? (
          <FolderIcon className="size-4" aria-hidden />
        ) : (
          <FileIcon className="size-4" aria-hidden />
        )}
        {node.name}
        {folder.success && folder.data.children.length > 0 && (
          <ChevronDownIcon className="size-4 ml-auto" aria-hidden />
        )}
      </button>
      {folder.success && (
        <ul className={cn("h-0 overflow-hidden pl-4", open && "h-fit")}>
          {folder.data.children.map((n, idx) => (
            <Li key={n.name} node={n} address={[...address, idx]} />
          ))}
        </ul>
      )}
    </li>
  );
}
export default function FileTree() {
  return (
    <ul className="max-w-xs border">
      {tree.map((n, idx) => (
        <Li key={n.name} node={n} address={[idx]} />
      ))}
    </ul>
  );
}
