import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  describe("Initialized with defaultCount=10 and description='Count Input'", () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="Count Input" />);
    });

    it("Renders 'Current Count: 10'", () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    it("Renders title as 'Count Input'", () => {
      expect(screen.getByText(/Count Input/)).toBeInTheDocument();
    });

    describe('When the incrementor changes to 5 and "+" button is clicked', () => {
      beforeEach(() => {
        userEvent.type(screen.getByLabelText(/Incrementor/), "{selectall}5");
        userEvent.click(screen.getByRole("button", { name: "Increment" }));
      });

      it("Renders 'Current Count: 15", () => {
        expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
      });
    });

    describe('When the incrementor changes to 25 and "-" button is clicked', () => {
      beforeEach(() => {
        userEvent.type(screen.getByLabelText(/Incrementor/), "{selectall}25");
        userEvent.click(screen.getByRole("button", { name: "Decrement" }));
      });

      it("Renders 'Current Count: -15", () => {
        expect(screen.getByText("Current Count: -15")).toBeInTheDocument();
      });
    });
  });

  describe("Initialized with defaultCount=0 and description='My Counter'", () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it("Renders 'Current Count:0", () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    it("Renders title as 'My Counter'", () => {
      expect(screen.getByText(/My Counter/i)).toBeInTheDocument();
    });

    describe("When + is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "Increment" }));
      });

      it("Renders 'Current Count: 1", () => {
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });

    describe("When - is clicked", () => {
      beforeEach(() => {
        fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
      });

      it("Renders 'Current Count: -1", () => {
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });
});
