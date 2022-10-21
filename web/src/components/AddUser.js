import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./request";
import Modal from "@mui/material/Modal";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#f54298",
    },
  },
});

const AddUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendData(data);
  };

  const sendData = (data) => {
    let obj = {
      name: data.get("name"),
      age: data.get("age"),
      cell: data.get("cell"),
      email: data.get("email"),
    };
    axios
      .post(`${baseURL}/addUser`, obj)
      .then((res) => {
        setMessage("User added successfully!");
        handleOpen();
        setTimeout(function () {
          navigate("/viewUsers");
        }, 1200);

        console.log(res);
      })
      .catch((e) => {
        setMessage("Email already registered!");
        handleOpen();
        console.log(e);
      });
  };

  const handleOpen = () => setOpen(true);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Modal
          open={open}
          onBackdropClick={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              backgroundColor: "white",
              border: "1px solid white",
              boxShadow: 20,
              borderRadius: 2,

              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message}
            </Typography>
          </Box>
        </Modal>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PersonAddAltRoundedIcon fontSize="large" />

          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cell"
                  label="Cell Number"
                  name="cell"
                  autoComplete="cell"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default AddUser;
