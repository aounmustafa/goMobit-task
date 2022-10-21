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
import { baseURL } from "../components/request";
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
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [age, setAge] = React.useState();
  const [ageError, setAgeError] = React.useState(false);
  const [cell, setCell] = React.useState("");
  const [name, setName] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
  };

  const sendData = () => {
    let obj = {
      name: name,
      age: age,
      cell: cell,
      email: email,
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
        setMessage("User already exists!");
        handleOpen();
        console.log(e);
      });
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const validateAge = () => {
    if (age >= 18 && age <= 60) {
      setAgeError(false);
    } else {
      setAgeError(true);
    }
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={() => validateEmail()}
                  onKeyUp={() => validateEmail()}
                  error={emailError}
                  helperText={emailError ? "Enter a valid email" : null}
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
                  value={cell}
                  onChange={(e) => setCell(e.target.value)}
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
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onKeyDown={() => validateAge()}
                  onKeyUp={() => validateAge()}
                  error={ageError}
                  helperText={ageError ? "Age must be 18-60 years old." : null}
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
              disabled={emailError || ageError ? true : false}
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
