import stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";

type ComponentType = { head: string; description: string; route?: string };
const ComponentsList: ComponentType[] = [
  {
    head: "Timer",
    route: "/timer",
    description:
      "Design a custom timer hook. It should be able to start, pause and reset the timer.",
  },
  {
    head: "Carousel",
    route: "/carousel",
    description:
      "Design a Auto scroll carousel component that displays a slideshow of images or content with smooth animation",
  },
  {
    head: "Optimized dropdown",
    description: "Optimize dropdown wth several hundered items",
  },
  {
    head: "Tree / Folder Structure View",
    route: "/folder-structure",
    description:
      "Create a tree-like structure or folder. Folder can be expandable",
  },
  {
    head: "Social Media Comment box",
    description: "Comment box with infinite replies",
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

function Card(data: ComponentType, index: number) {
  return (
    <Link to={data.route} {...stylex.props(styles.cardLink)}>
      <div
        key={index}
        {...stylex.props(
          styles.card,
          bgStylesArray[index % bgStylesArray.length]
        )}
      >
        <div {...stylex.props(styles.img)}>&nbsp;</div>
        <div {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.title)}>{data.head}</div>
          <div {...stylex.props(styles.description)}>{data.description}</div>
        </div>
      </div>
    </Link>
  );
}

export default function Cards() {
  return (
    <div {...stylex.props(styles.cards)}>
      {ComponentsList.map((component, index) => Card(component, index))}
    </div>
  );
}
const styles = stylex.create({
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridRowGap: 20,
  },
  cardLink: {
    color: "#F4F1D0",
    textDecoration: "none",
  },
  card: {
    display: "flex",
    cursor: "pointer",
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
    // backgroundColor: "",
    height: "55%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: { padding: 20, display: "flex", flexDirection: "column", gap: 12 },
  title: { fontWeight: 700, fontSize: 28 },
  description: { fontSize: 16 },
});

const bgStyles = stylex.create({
  bg1: { backgroundColor: "#9AA88C" },
  bg2: { backgroundColor: "#a88c8c" },
  bg3: { backgroundColor: "#9aa88c" },
  bg4: { backgroundColor: "#8ca8a8" },
  bg5: { backgroundColor: "#9a8ca8" },
  bg6: { backgroundColor: "#aaaaaa" },
  bg7: { backgroundColor: "#ac6363" },
  bg8: { backgroundColor: "#c6b37f" },
});

const bgStylesArray = [
  bgStyles.bg1,
  bgStyles.bg2,
  bgStyles.bg3,
  bgStyles.bg4,
  bgStyles.bg5,
  bgStyles.bg6,
  bgStyles.bg7,
  bgStyles.bg8,
];
