import React, { Fragment } from "react";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material";
import { useRecoilState } from "recoil";
import { allUsersState } from "../globalstate";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#DEB992",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  border: "#DEB992 solid 1px",
}));

const UsersTable = (props) => {
  const { handleOpen, handleName } = props;
  const [users, setUsers] = useRecoilState(allUsersState);
  return (
    <Fragment>
      <TableContainer
        style={{
          width: "80vw",
          border: "#DEB992 solid 1px",
          borderRadius: "5px",
          marginTop: "50px",
          marginBottom: "50px",
          color: "#DEB992",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ border: "#DEB992 solid 1px" }}>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Active</StyledTableCell>
              <StyledTableCell>Admin</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell>{handleName(user.profile)}</StyledTableCell>
                <StyledTableCell>{user.profile.email}</StyledTableCell>
                <StyledTableCell>
                  {user.active === true ? "YES" : "NO"}
                </StyledTableCell>
                <StyledTableCell>
                  {user.admin === true ? "YES" : "NO"}
                </StyledTableCell>
                <StyledTableCell>
                  {user.status === true ? "JOINED" : "PENDING"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ background: "#1BA098", borderRadius: "15px" }}
        onClick={() => {
          handleOpen();
        }}
      >
        Add User
      </Button>
    </Fragment>
  );
};

export default UsersTable;
