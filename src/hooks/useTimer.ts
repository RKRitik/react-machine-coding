import { useState, useEffect, useRef, useCallback } from "react";

function useTimer(START_TIME = 5) {
  const [seconds, setSeconds] = useState(START_TIME);
  const timerRef = useRef<number | undefined>();
  const [isRunning, setRunning] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const stop = useCallback(() => {
    setRunning(false);
    setSeconds(START_TIME);
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  }, [START_TIME]);

  const start = useCallback(() => {
    setRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 1) stop();
        return seconds - 1;
      });
    }, 1000);
  }, [stop]);

  const pause = useCallback(() => {
    setPaused(true);
    clearInterval(timerRef.current);
  }, []);

  const resume = useCallback(() => {
    setPaused(false);
    start();
  }, [start]);

  useEffect(() => {
    return () => {
      if (timerRef.current)
        //avoid memory leak
        clearInterval(timerRef.current);
    };
  }, []);

  return { isRunning, isPaused, start, stop, seconds, pause, resume };
}

export { useTimer };
