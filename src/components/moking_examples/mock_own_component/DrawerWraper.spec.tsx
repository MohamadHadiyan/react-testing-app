import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import RightDrawer from "../drawer/RightDrawer";
import DrawerWraper from "./DrawerWraper";

jest.mock("../drawer/RightDrawer");
mocked(RightDrawer).mockImplementation(() => <div>Mocked RightDrawer</div>);
describe("DrawerWraper", () => {
  it("renders RightDrawer component", () => {
    render(<DrawerWraper />);
    expect(screen.queryByText("Drawer Component")).not.toBeInTheDocument();
    expect(screen.getByText("Mocked RightDrawer")).toBeInTheDocument();
  });
});
