import { createFileRoute } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";
import Card from "../components/card";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  //https://lawsofux.com
  return (
    <div>
      <p {...stylex.props(styles.subHeading)}>
        Collection of Commonly Asked Components/Features in Frontend React
        Coding Interviews
      </p>
      <Card />
    </div>
  );
}

const styles = stylex.create({
  subHeading: {
    color: "#F4F1D0",
    fontSize: 32,
    fontWeight: 500,
  },
});

