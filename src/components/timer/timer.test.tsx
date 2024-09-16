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
    // Use act to wrap interactions that cause state changes
    await act(async () => {
      const startCta = screen.getByTestId("start-timer");
      startCta.click();

      // Wait for the timer to update
      await waitFor(() => expect(timer.textContent).toBe("9"), {
        timeout: 1500,
      });
      await waitFor(() => expect(timer.textContent).toBe("8"), {
        timeout: 2500,
      });
    });
  });

  // it("stops timer on pressing stop after 1 second", () => {
  //   throw new Error();
  // });

  // it("resets timer on pressing reset after starting", () => {
  //   throw new Error();
  // });

  // it("timer automatically resets after countdown finishes start start state of 5", () => {
  //   throw new Error();
  // });
});
