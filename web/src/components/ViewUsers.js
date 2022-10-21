import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseURL } from "./request";

const ViewUsers = () => {
  const [selected, setSelected] = React.useState("All");
  const [users, setUsers] = React.useState([]);
  const [filterArr, setFilterArr] = React.useState([]);

  const filterTable = (val) => {
    if (val !== "All") {
      let arr = users.filter((l, i) => {
        return l.name === val;
      });
      setFilterArr(arr);
    } else {
      setFilterArr(users);
    }
  };

  React.useEffect(() => {
    axios
      .get(`${baseURL}/getUsers`)
      .then((res) => {
        setUsers(res.data);
        setFilterArr(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleChange = (user) => {
    setSelected(user);
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "90%",
          margin: 15,
        }}
      >
        <form onSubmit={(event) => event.preventDefault()}>
          <label style={{ marginRight: 10, fontWeight: "600", fontSize: 20 }}>
            Search User
          </label>
          <select
            onChange={(event) => handleChange(event.target.value)}
            value={selected}
            name="selected"
            id="selected"
            style={{
              width: "35%",
              borderRadius: 10,
              padding: 10,
              border: "1px solid white",
              backgroundColor: "whitesmoke",
            }}
          >
            <option value="All">All</option>
            {users.map((l, i) => (
              <option value={l.name}>{l.name}</option>
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
        </form>
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
              <TableCell align="right">Is Deleted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterArr.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.cell}</TableCell>
                <TableCell align="right">{row.created}</TableCell>
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
