import stylex from "@stylexjs/stylex";
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
  function slideButtons() {
    return (
      <div {...stylex.props(styles.slideButtons)}>
        <button onClick={prevSlide} {...stylex.props(styles.prevButton)}>
          <img width={40} src={"./left-arrow.svg"} alt="header-logo"></img>
        </button>
        <button onClick={nextSlide} {...stylex.props(styles.nextButton)}>
          <img width={40} src={"./left-arrow.svg"} alt="header-logo"></img>
        </button>
      </div>
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
      {props.children?.[index]}
      {slideButtons()}
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
  slideButtons: {
    position: "absolute",
    width: "100%",
    backgroundColor: "red",
  },
  prevButton: {
    position: "absolute",
    left: 20,
  },
  nextButton: {
    position: "absolute",
    right: 20,
    transform: "rotate(180deg)",
  },
});

export default Carousel;
