import React from "react";
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

const UsersTable = (props) => {
  const { rows, handleOpen, handleName } = props;
  return (
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
            {/* <StyledTableCell>Team</StyledTableCell> */}
            <StyledTableCell>Active</StyledTableCell>
            <StyledTableCell>Admin</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell>{handleName(row.profile)}</StyledTableCell>
              <StyledTableCell>{row.profile.email}</StyledTableCell>
              {/* <StyledTableCell>{row.team}</StyledTableCell> */}
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
  );
};

export default UsersTable;
