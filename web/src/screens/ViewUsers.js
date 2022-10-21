import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseURL } from "../components/request";

const ViewUsers = () => {
  const [selected, setSelected] = React.useState("All");
  const [users, setUsers] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  const sendSearch = (selected) => {
    axios
      .get(`${baseURL}/getUsers/${selected}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    axios
      .get(`${baseURL}/getUsers/${selected}`)
      .then((res) => {
        setUsers(res.data);
        setOptions(res.data);
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
            {options.map((l, i) => (
              <option value={l.name}>{l.name}</option>
            ))}
          </select>
          <button
            onClick={() => sendSearch(selected)}
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Cell No</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="left">Is Deleted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.cell}</TableCell>
                <TableCell align="left">{row.created}</TableCell>
                <TableCell align="left">
                  {row.deleted ? "True" : "False"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewUsers;
