import { createFileRoute } from "@tanstack/react-router";
import ShowTimers from "../components/timer/TimerComponent";

export const Route = createFileRoute("/timer")({
  component: ShowTimers,
});

