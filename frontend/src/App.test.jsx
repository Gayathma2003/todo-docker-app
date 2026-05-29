import { render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: "Test", description: "Test desc" }
        ])
    })
  );
});

test("renders app", () => {
  render(<App />);
  expect(screen.getByText(/Add a Task/i)).toBeInTheDocument();
});