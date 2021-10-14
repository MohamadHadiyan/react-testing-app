import { render, screen } from "@testing-library/react";
import RightDrawer from "./RightDrawer";

jest.mock("@material-ui/core", () => ({
  ...jest.requireActual("@material-ui/core"),
  SwipeableDrawer: jest.fn(() => <div>Hello Drawer</div>),
}));

describe("RightDrawer", () => {
  it("Don't show 'This is a Drawer'", () => {
    render(<RightDrawer />);
    expect(screen.queryByText("Hello Drawer")).toBeInTheDocument();
  });

  it("Click on the 'Open Drawer' Button, shows 'This is a Drawer'", () => {
    render(<RightDrawer />);
    expect(screen.queryByText("Hello Drawer")).toBeInTheDocument();
  });
});
