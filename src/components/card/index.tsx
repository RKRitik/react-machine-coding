import stylex from "@stylexjs/stylex";

type ComponentType = { head: string; description: string };
const ComponentsList: ComponentType[] = [
  {
    head: "Carousel",
    description:
      "Design a Auto scroll carousel component that displays a slideshow of images or content with smooth animation",
  },
  {
    head: "Optimized dropdown",
    description: "Optimize dropdown wth several hundered items",
  },
  {
    head: "Tree / Folder Structure View",
    description:
      "Create a tree-like structure or folder. Folder can be expandable",
  },
  {
    head: "Dark/Light Theme",
    description: "Dark mode and light theme switcher",
  },
  {
    head: "Autocomplete and typeahead",
    description:
      "Populate the data in the dropdown as per the text entered; Suggestions should be selectable",
  },
  {
    head: "Infinte Scoll",
    description:
      "Develop a component that loads more data as the user scrolls down the page",
  },
  {
    head: "Drag and Drop",
    description:
      "Develop a feature that allows users to drag and drop items within a list",
  },
];

function Card(data: ComponentType) {
  return (
    <div {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.img)}>&nbsp;</div>
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.title)}>{data.head}</div>
        <div {...stylex.props(styles.description)}>{data.description}</div>
      </div>
    </div>
  );
}

export default function Cards() {
  return (
    <div {...stylex.props(styles.cards)}>
      {ComponentsList.map((component, index) => (
        <Card key={index} {...component} />
      ))}
    </div>
  );
}
const styles = stylex.create({
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridRowGap: 20,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#16171d",
    height: 420,
    width: 340,
    transition: "transform 0.4s ease-in-out",
    ":hover": {
      transform: "scale(1.05)",
    },
    borderRadius: 12,
  },
  img: {
    backgroundColor: "#9AA88C",
    height: "55%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: { padding: 20, display: "flex", flexDirection: "column", gap: 12 },
  title: { fontWeight: 700, fontSize: 28 },
  description: { fontSize: 16 },
});
