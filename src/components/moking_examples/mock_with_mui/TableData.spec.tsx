import { DataGrid } from "@mui/x-data-grid";
import { fireEvent, render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import GiveMoney, { rowsData } from "./TableData";

jest.mock("@mui/x-data-grid", () => ({
  ...jest.requireActual("@mui/x-data-grid"),
  DataGrid: jest.fn(() => <div>Table</div>),
}));

const mockedDataGrid = mocked(DataGrid);

describe("GiveMoney component", () => {
  beforeEach(() => {
    mockedDataGrid.mockClear();
  });

  it("renders Material-UI grid with columnDefs and rowData", () => {
    const handleOnMoney = jest.fn();
    render(<GiveMoney onMoney={handleOnMoney} />);
    fireEvent.click(screen.getByRole("button", { name: "Give 33 Dollars" }));

    expect(handleOnMoney).toHaveBeenCalledTimes(1);
    expect(handleOnMoney).toHaveBeenCalledWith(33);
  });

  it("renders table passing the expecte props", () => {
    render(<GiveMoney onMoney={jest.fn()} />);
    expect(mockedDataGrid).toHaveBeenCalledTimes(1);
    expect(mockedDataGrid).toHaveBeenLastCalledWith(
      {
        rows: rowsData,
        columns: [
          expect.objectContaining({ field: "id" }),
          expect.objectContaining({ field: "firstName" }),
          expect.objectContaining({ field: "lastName" }),
          expect.objectContaining({ field: "age" }),
          expect.objectContaining({ field: "fullName" }),
        ],
        pageSize: 5,
        rowsPerPageOptions: [5],
        checkboxSelection: true,
        disableSelectionOnClick: true,
      },
      {}
    );
  });
});
