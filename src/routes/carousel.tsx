import { createFileRoute } from "@tanstack/react-router";
import Carousel from "../components/carousel";
import { ReactNode } from "react";

export const Route = createFileRoute("/carousel")({
  component: () => <ShowCarousel />,
});

function ShowCarousel() {
  const divs: ReactNode[] = [<div>test1</div>, <div>test2</div>];
  return <Carousel>{divs}</Carousel>;
}

