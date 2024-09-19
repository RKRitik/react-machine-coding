import { useTimer } from "../../hooks/useTimer";
import { Button } from "../../../Component-Lab/src/ui/button";

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
        <Button size="medium" data-testid="start-timer" disabled={isRunning} label="Start" onClick={start} />
        <Button size="medium" data-testid="stop-timer" disabled={!isRunning} label="Stop" onClick={stop} />
        <Button size="medium" data-testid="pause-timer" disabled={!isRunning} label={isPaused ? "Resume" : "Pause"} onClick={isPaused ? resume : pause}/>
      </div>
    </div>
  );
}
