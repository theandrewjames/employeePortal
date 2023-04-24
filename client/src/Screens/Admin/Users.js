import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import NavBar from "../../Components/NavBar";
import { userState } from "../../globalstate";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fragment } from "react";

const Users = () => {
  const [user, setUser] = useRecoilState(userState);

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
      <h1>User Registry</h1>
      <div>A general view of all your members in your orginization</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Admin</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.team}</TableCell>
                <TableCell align="right">
                  {row.active === true ? "YES" : "NO"}
                </TableCell>
                <TableCell align="right">
                  {row.admin === true ? "YES" : "NO"}
                </TableCell>
                <TableCell align="right">
                  {row.status === true ? "JOINED" : "PENDING"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained">Add User</Button>
    </Fragment>
  );
};

export default Users;
