import stylex from "@stylexjs/stylex";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { ReactNode, useState } from "react";

interface propType {
  children: ReactNode[];
}

/**
 *
 * @param props list of nodes to be rendered in carousel
 * @returns Carousel
 */
function Carousel(props: propType) {
  const totalSlides = props.children.length;
  const [index, setIndex] = useState(0);

  function nextSlide() {
    setIndex((index + 1) % totalSlides);
  }

  function prevSlide() {
    setIndex((index - 1 + totalSlides) % totalSlides);
  }
  function leftButton() {
    return (
      <button onClick={prevSlide} {...stylex.props(styles.prevButton)}>
        <FaArrowLeft />
      </button>
    );
  }

  function rightButton() {
    return (
      <button onClick={nextSlide} {...stylex.props(styles.nextButton)}>
        <FaArrowRight />
      </button>
    );
  }

  function slidePosition() {
    return (
      <div {...stylex.props(styles.slidePosition)}>
        {Array.from({ length: totalSlides }, (_v, i) => (
          <div
            onClick={() => setIndex(i)}
            key={i}
            {...stylex.props(i === index ? styles.slideSelected : styles.slide)}
          >
            &nbsp;
          </div>
        ))}
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.slideContent)}>
        {props.children?.map((child, index) => (
          <div
            key={index}
            style={{ transform: `translateX(-${index * 100}%)` }}
            {...stylex.props(styles.slideContent)}
          >
            {child}
          </div>
        ))}
      </div>
      {leftButton()}
      {rightButton()}
      {slidePosition()}
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    border: "1px solid white",
    borderRadius: 4,
    overflow: "hidden",
  },
  slideContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  slideContent: {
    userSelect: "none",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  slidePosition: {
    position: "absolute",
    display: "flex",
    gap: 8,
    bottom: 20,
  },
  slide: { cursor: "pointer", width: 30, borderBottom: "3px solid grey" },
  slideSelected: {
    cursor: "pointer",
    width: 30,
    borderBottom: "3px solid white",
  },
  prevButton: {
    cursor: "pointer",
    position: "absolute",
    left: 10,
    color: "white",
    border: "none",
    background: "transparent",
  },
  nextButton: {
    cursor: "pointer",
    border: "none",
    color: "white",
    position: "absolute",
    right: 10,
    background: "transparent",
  },
});

export default Carousel;
