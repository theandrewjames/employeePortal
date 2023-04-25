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
  const { rows, handleOpen, handleName } = props;
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
