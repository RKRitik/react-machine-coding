import stylex from "@stylexjs/stylex";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { ReactNode, useState, useEffect, useRef, useCallback } from "react";

interface propType {
  children: ReactNode[];
  autoPlay?: boolean;
  infiniteScroll?: boolean; // Add optional infiniteScroll prop
}

function Carousel(props: propType) {
  const [slides, setSlides] = useState<ReactNode[]>([]);
  const [index, setIndex] = useState(1); // Start at 1 to show first slide correctly
  const totalSlides = props.children.length;
  const transitionRef = useRef<boolean>(true); // To control transition application

  const nextSlide = useCallback(() => {
    if (transitionRef.current) {
      setIndex(index + 1);
    } else {
      transitionRef.current = true; // Re-enable transition after jump
      setTimeout(() => setIndex(index + 1), 0); // Move to next with transition
    }
  }, [index]);

  useEffect(() => {
    if (props.autoPlay) {
      setInterval(nextSlide, 2000);
    }
  }, [nextSlide, props.autoPlay]);

  useEffect(() => {
    // Clone first and last slides for seamless infinite scrolling
    setSlides([
      props.children[totalSlides - 1],
      ...props.children,
      props.children[0],
    ]);
  }, [props.children, totalSlides]);

  function handleTransitionEnd() {
    if (!transitionRef.current) return;

    if (props.infiniteScroll) {
      if (index === 0) {
        setIndex(totalSlides); // Jump to the real last slide (no transition)
        transitionRef.current = false; // Disable transition for jump
      } else if (index === totalSlides + 1) {
        setIndex(1); // Jump to the real first slide (no transition)
        transitionRef.current = false; // Disable transition for jump
      }
    }
  }

  function prevSlide() {
    if (transitionRef.current) {
      setIndex(index - 1);
    } else {
      transitionRef.current = true; // Re-enable transition after jump
      setTimeout(() => setIndex(index - 1), 0); // Move to previous with transition
    }
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
            onClick={() => setIndex(i + 1)}
            key={i}
            {...stylex.props(
              i + 1 === index ? styles.slideSelected : styles.slide
            )}
          >
            &nbsp;
          </div>
        ))}
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div
        {...stylex.props(styles.slidesWrapper)}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionRef.current ? "transform 0.5s ease" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides?.map((child, idx) => (
          <div key={idx} {...stylex.props(styles.slideContent)}>
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
  slidesWrapper: {
    display: "flex",
    width: "100%",
  },
  slideContent: {
    userSelect: "none",
    display: "flex",
    width: "100%",
    height: "100%",
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
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
