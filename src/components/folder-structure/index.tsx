import { useState } from "react";
import stylex from "@stylexjs/stylex";

type Folder = {
  name: string;
  files?: Folder[];
};

export function FolderStructure({ data }: { data: Folder[] }) {
  return (
    <div {...stylex.props(styles.container)}>
      {data.map((file) => (
        <Folder file={file} />
      ))}
    </div>
  );
}

function Folder({ file }: { file: Folder }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div>
      <div
        onClick={toggleCollapse}
        {...stylex.props(file.files?.length ? styles.folder : {})}
      >
        {file.name}
      </div>
      {!isCollapsed && !!file.files?.length && (
        <div {...stylex.props(styles.children)}>
          <FolderStructure data={file.files} />
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  folder: {
    cursor: "pointer",
  },
  children: {
    display: "flex",
    marginLeft: "1em",
    marginTop: "1em",
  },
});
