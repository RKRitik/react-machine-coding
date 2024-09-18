import TimerComponent from "./TimerComponent";
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("testing timer page", () => {
  it("page renders with timer with default state 10", () => {
    render(<TimerComponent />);
    const timer = screen.getByTestId("timer-seconds");
    expect(timer.textContent).toBe("10");
  });

  it("page renders with timer with custom initial state 20", () => {
    render(<TimerComponent initialState={20} />);
    const timer = screen.getByTestId("timer-seconds");
    expect(timer.textContent).toBe("20");
  });

  it("starts timer on pressing start", async () => {
    render(<TimerComponent />);
    const timer = screen.getByTestId("timer-seconds");
    expect(timer.textContent).toBe("10");
    const startCta = screen.getByTestId("start-timer");
    // When testing, code that causes React state updates should be wrapped into act
    act(() => { startCta.click(); });
    await waitFor(() => expect(timer.textContent).toBe("9"), {
      timeout: 1500,
    });
    await waitFor(() => expect(timer.textContent).toBe("8"), {
      timeout: 2500,
    });
  });

  it("pause timer on pressing stop after 1 second", async () => {
    render(<TimerComponent />);
    const timer = screen.getByTestId("timer-seconds");
    const startCta = screen.getByTestId("start-timer");
    const pauseCta = screen.getByTestId("pause-timer");
    act(() => { startCta.click(); });
    await waitFor(() => expect(timer.textContent).toBe("9"), {
      timeout: 1500,
    });
    act(() => pauseCta.click());
    await waitFor(() => expect(timer.textContent).toBe("9"), {
      timeout: 2500,
    });
  });

  it("resets timer on pressing reset after starting", async () => {
    render(<TimerComponent />);
    const timer = screen.getByTestId("timer-seconds");
    const startCta = screen.getByTestId("start-timer");
    const stopCta = screen.getByTestId("stop-timer");
    act(() => { startCta.click(); });
    await waitFor(() => expect(timer.textContent).toBe("9"), {
      timeout: 1500,
    });
    act(() => stopCta.click());
    await waitFor(() => expect(timer.textContent).toBe("10"), {
      timeout: 2500,
    });
  });
  const INITIAL_STATE = 4;
  it(`timer automatically resets after countdown finishes with start state of ${INITIAL_STATE}`, async () => {
    render(<TimerComponent initialState={INITIAL_STATE} />);
    const timer = screen.getByTestId("timer-seconds");
    const startCta = screen.getByTestId("start-timer");
    act(() => { startCta.click(); });
    await waitFor(() => expect(timer.textContent).toBe((INITIAL_STATE - 1).toString()), {
      timeout: 1500,
    });
    await waitFor(() => expect(timer.textContent).toBe(INITIAL_STATE.toString()), { timeout: 6500 });
  });
});
