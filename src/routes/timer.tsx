import { createFileRoute } from "@tanstack/react-router";
import { useTimer } from "../hooks/useTimer";

export const Route = createFileRoute("/timer")({
  component: ShowTimers,
});

function ShowTimers() {
  const { start, stop, seconds, isRunning, pause, isPaused, resume } =
    useTimer(10);
  return (
    <div>
      <h1>Timer</h1>
      <h2>{seconds}</h2>
      <div>
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

