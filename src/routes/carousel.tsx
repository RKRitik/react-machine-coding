import { createFileRoute } from "@tanstack/react-router";
import Carousel from "../components/carousel";
import { ReactNode } from "react";

export const Route = createFileRoute("/carousel")({
  component: () => <ShowCarousel />,
});

function ShowCarousel() {
  const divs: ReactNode[] = [<div>test1</div>, <div>test2</div>];
  return (
    <div>
      <p>Default</p> <Carousel>{divs}</Carousel>
      <p>Autoplay</p> <Carousel autoPlay={true}>{divs}</Carousel>
      <p>Autoplay with infinite scroll</p>{" "}
      <Carousel infiniteScroll={true}>{divs}</Carousel>
    </div>
  );
}

