import { createFileRoute } from "@tanstack/react-router";
import { FolderStructure } from "../components/folder-structure";

const sample_data = [
  { name: ".gitignore" },
  { name: "README.md" },
  {
    name: "src",
    files: [
      {
        name: "routes",
        files: [{ name: "__root.tsx" }],
      },
      { name: "assets", files: [] },
      { name: "index.js" },
      {
        name: "components",
        files: [
          { name: "button.tsx" },
          { name: "folder-structure", files: [{ name: "index.tsx" }] },
        ],
      },
    ],
  },
  { name: "vite.config.ts" },
  { name: "package.json" },
  { name: "public", files: [{ name: "index.html" }, { name: "favicon.ico" }] },
];

export const Route = createFileRoute("/folder-structure")({
  component: () => (
    <>
      <h1>Folder Tree Structure</h1>
      <FolderStructure data={sample_data} />
    </>
  ),
});

