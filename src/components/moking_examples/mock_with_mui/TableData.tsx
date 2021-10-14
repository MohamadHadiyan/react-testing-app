/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";

interface IProps {
  onMoney: (num: number) => void;
}

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

let id = 1;
export const rowsData = [
  { id: id++, firstName: "Arash", lastName: "Mandegar", age: 20 },
  { id: id++, firstName: "Negar", lastName: "Salehi", age: 24 },
  { id: id++, firstName: "Milad", lastName: "Nasiri", age: 30 },
  { id: id++, firstName: "Arezo", lastName: "Baghban", age: 22 },
  { id: id++, firstName: "Shayan", lastName: "Montazeri", age: 25 },
  { id: id++, firstName: "Omid", lastName: "Sharif", age: 21 },
  { id: id++, firstName: "Sina", lastName: "Entezam", age: 34 },
  { id: id++, firstName: "Shayda", lastName: "Mokhber", age: 31 },
  { id: id++, firstName: "Shirin", lastName: "Amini", age: 28 },
  { id: id++, firstName: "Taha", lastName: "Taghvi poor", age: 20 },
  { id: id++, firstName: "Hooman", lastName: "Shajariyan", age: 29 },
  { id: id++, firstName: "Arman", lastName: "Binesh Pazhoo", age: 32 },
  { id: id++, firstName: "Bita", lastName: "Hamraz", age: 25 },
];

const GiveMoney = ({ onMoney }: IProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Button variant="contained" color="primary" onClick={() => onMoney(33)}>
        Give 33 Dollars
      </Button>
      <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
        <DataGrid
          rows={rowsData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default GiveMoney;
