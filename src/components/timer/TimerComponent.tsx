import { useTimer } from "../../hooks/useTimer";

type TimerProps = {
  initialState?: number;
};

export default function TimerComponent(props: TimerProps) {
  const { start, stop, seconds, isRunning, pause, isPaused, resume } = useTimer(
    props.initialState ?? 10
  );
  return (
    <div>
      <h1>Timer</h1>
      <h2 data-testid="timer-seconds">{seconds}</h2>
      <div>
        <button data-testid="start-timer" disabled={isRunning} onClick={start}>
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
