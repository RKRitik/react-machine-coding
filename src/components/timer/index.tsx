import stylex from "@stylexjs/stylex";
import { useTimer } from "../../hooks/useTimer";

export default function ShowTimers() {
  const { start, stop, seconds, isRunning, pause, isPaused, resume } =
    useTimer(10);
  return (
    <div>
      <h1>Timer</h1>
      <h2>{seconds}</h2>
      <div {...stylex.props(styles.container)}>
        <button disabled={isRunning} onClick={start}>
          Start
        </button>
        <button disabled={!isRunning} onClick={stop}>
          Stop
        </button>
        <button disabled={!isRunning} onClick={isPaused ? resume : pause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    gap: 10,
  },
});
