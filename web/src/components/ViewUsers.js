import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewUsers = () => {
  const users = [
    "Frozen yoghurt",
    "Ice cream sandwich",
    "Eclair",
    "Cupcake",
    "Gingerbread",
  ];
  const [selected, setSelected] = React.useState("All");
  const rows = [
    {
      name: "Frozen yoghurt",
      cell: 159,
      email: 6.0,
      created: 24,
      id: 4.0,
      deleted: 5,
    },
    {
      name: "Ice cream sandwich",

      cell: 159,
      email: 6.0,
      created: 24,
      id: 4.0,
      deleted: 5,
    },
    {
      name: "Eclair",
      cell: 159,
      email: 6.0,
      created: 24,
      id: 4.0,
      deleted: 5,
    },
    {
      name: "Cupcake",
      cell: 159,
      email: 6.0,
      created: 24,
      id: 4.0,
      deleted: 5,
    },
  ];
  const [filterArr, setFilterArr] = React.useState(rows);

  const filterTable = (val) => {
    if (val !== "All") {
      let arr = rows.filter((l, i) => {
        return l.name === val;
      });
      setFilterArr(arr);
    } else {
      setFilterArr(rows);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "90%", margin: 15 }}>
        <label style={{ marginRight: 10, fontWeight: "600", fontSize: 20 }}>
          Search User
        </label>
        <select
          name="selected"
          id="selected"
          style={{
            width: "35%",
            borderRadius: 10,
            padding: 10,
            border: "1px solid white",
          }}
        >
          <option value="All" onClick={() => setSelected("All")}>
            All
          </option>
          {users.map((l, i) => (
            <option value={selected} onClick={() => setSelected(l)}>
              {l}
            </option>
          ))}
        </select>
        <button
          onClick={() => filterTable(selected)}
          style={{
            borderRadius: 10,
            width: "10%",
            border: "1px solid white",
            padding: 5,
            marginLeft: 10,
          }}
        >
          Search
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Cell No</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Deleted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterArr.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.created}</TableCell>
                <TableCell align="right">{row.cell}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.deleted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewUsers;
