import { Navigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { Box, Modal } from "@mui/material";
import { Fragment } from "react";
import { useState } from "react";
import SignUp from "../../Components/SignUp";
import UsersTable from "../../Components/UsersTable";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Users = () => {
  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: false,
  });

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      labe: "First Name",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      labe: "Last Name",
    },
    {
      id: 3,
      name: "email",
      type: "text",
      placeholder: "Email",
      labe: "Email",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      labe: "Password",
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      labe: "Confirm Password",
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
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
          <Title>User Registry</Title>
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
        <UsersTable rows={rows} handleOpen={handleOpen} />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <SignUp
          admin={admin}
          setAdmin={setAdmin}
          handleChange={handleChange}
          handleSignUp={handleSignUp}
          inputs={inputs}
          userInfo={userInfo}
        />
      </Modal>
    </Fragment>
  );
};

export default Users;
