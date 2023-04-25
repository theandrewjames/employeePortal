import { Navigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { Box, Modal } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import SignUp from "../../Components/SignUp";
import UsersTable from "../../Components/UsersTable";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { allUsersState, userState } from "../../globalstate";
import api from "../../Services/api";
import { getAllUsers } from "../../Services/users";

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Container = styled.div`
  background-color: #051622;
  color: #1ba098;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  padding-top: 5%;
`;

const Users = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(allUsersState);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
    },
    {
      id: 3,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      label: "Phone",
    },
    {
      id: 5,
      name: "username",
      type: "username",
      placeholder: "Username",
      label: "Username",
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
    {
      id: 7,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
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
    console.log(userInfo);
  };

  const getUsers = () => {
    getAllUsers(6).then((result) => {
      setUsers(result);
    });
  };

  useEffect(() => {
    getUsers();
  });

  const rows = users;

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (!user.isAdmin) {
    return <Navigate replace to="/announcements" />;
  } else {
    return (
      <Fragment>
        <div>
          <NavBar />
        </div>
        <Container>
          <div>
            <Title>User Registry</Title>
            <div>A general view of all your members in your orginization</div>
          </div>
          <UsersTable rows={rows} handleOpen={handleOpen} />
          <Modal open={open} onClose={handleClose}>
            <SignUp
              handleChange={handleChange}
              handleSignUp={handleSignUp}
              inputs={inputs}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </Modal>
        </Container>
      </Fragment>
    );
  }
};

export default Users;
