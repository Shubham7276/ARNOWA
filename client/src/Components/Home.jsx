import * as React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const username = localStorage.getItem("user");
  const Id = localStorage.getItem("Id");

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [message, setMessage] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // getAll users

  useEffect(() => {
    const Getusers = async () => {
      const url = "http://localhost:8080/user";
      const responce = await axios.get(url);
      setData(responce.data);
      console.log(responce.data);
    };
    Getusers();
  }, []);

  // Logout function

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Id");
    navigate("/login");
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClickOpen();
    }, 300000);
  }, []);

  // add new messages

  const Addmessages = async () => {
    const url = "http://localhost:8080/user";
    const responce = await axios.put(`${url}/${Id}`, message);
    setMessage("");
    // setData(responce.data)
    console.log(responce.data);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-1">
            <div className="fancy">Welcome {username}
            <Button color="error" onClick={Logout}>Logout</Button>
            </div>

            <TextField
              id="outlined-multiline-static"
              label="Type Messges"
              value={message}
              multiline
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              fullWidth
            />
            <div className="btn">
              <Button variant="contained" onClick={Addmessages} fullWidth>
                Submit
              </Button>
            </div>
          </div>

          <div className="col">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">
                      Mobile_Number
                    </StyledTableCell>
                    <StyledTableCell align="center">Login time</StyledTableCell>
                    {/* <StyledTableCell align="center">Messages</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((user, index) => (
                    <>
                      {username !== user.name ? (
                        <StyledTableRow key={user._id}>
                          <StyledTableCell align="center">
                            {user.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {user.email}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {user.mobileNo}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {format(user.createdAt)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : null}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* _______________________________________after 5 min show Dialog box_______________________________________________ */}

        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Session Expired</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Session is Expired ! please login again...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={Logout}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Home;
