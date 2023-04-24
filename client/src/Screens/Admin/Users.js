import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../Components/NavBar";
import { userState } from "../../globalstate";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment } from "react";
import { styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useState } from "react";
import SignUp from "../../Components/SignUp";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
    color: "#DEB992",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const Users = () => {
  const [user, setUser] = useRecoilState(userState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createData = (name, email, team, active, admin, status) => {
    return { name, email, team, active, admin, status };
  };

  const rows = [
    createData(
      "Chris Purnell",
      "yocrizzle@gmail.com",
      "Chick-Filla",
      true,
      true,
      true
    ),
    createData(
      "Frank Fournier",
      "foshizzle@gmail.com",
      "PopEyes",
      true,
      true,
      true
    ),
    createData(
      "Will Marttala",
      "wamizzle@gmail.com",
      null,
      false,
      false,
      false
    ),
    createData(
      "Helena Makendengue",
      "hmasizzle@gmail.com",
      null,
      false,
      false,
      false
    ),
  ];

  // if (!user.isLoggedIn) {
  //     return <Navigate replace to="/" />
  // } else {
  //     return (
  //         <div>
  //             <NavBar />
  //             <h1>Users</h1>
  //         </div>
  //     )
  // }

  return (
    <Fragment>
      <div>
        <NavBar />
      </div>

      <Box
        style={{
          color: "#1ba098",
          background: "#051622",
          paddingTop: "100px",
          textAlign: "center",
        }}
      >
        <div>
          <h1>User Registry</h1>
          <div>A general view of all your members in your orginization</div>
        </div>
      </Box>

      <Box
        style={{
          height: "100vh",
          paddingTop: "100px",
          background: "#051622",
        }}
      >
        <TableContainer
          style={{
            width: "80vw",
            margin: "auto",
            border: "#DEB992",
            color: "#DEB992",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Team</StyledTableCell>
                <StyledTableCell>Active</StyledTableCell>
                <StyledTableCell>Admin</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.team}</StyledTableCell>
                  <StyledTableCell>
                    {row.active === true ? "YES" : "NO"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.admin === true ? "YES" : "NO"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row.status === true ? "JOINED" : "PENDING"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            style={{ background: "#1BA098", borderRadius: "15px" }}
            onClick={() => {
              handleOpen();
            }}
          >
            Add User
          </Button>
        </TableContainer>
      </Box>
      <Button>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <SignUp />
      </Modal>
    </Fragment>
  );
};

export default Users;
