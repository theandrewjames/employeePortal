import { Navigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { Modal } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import SignUp from "../../Components/SignUp";
import UsersTable from "../../Components/UsersTable";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { allUsersState, companyState, userState } from "../../globalstate";
import { createUser, getAllUsers } from "../../Services/users";

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
`;

const Users = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  // const [users, setUsers] = useRecoilState(allUsersState);
  const company = useRecoilValue(companyState);
  const setUsers = useSetRecoilState(allUsersState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (e) => {
  //   setUserInfo(() => ({
  //     ...userInfo,
  //     isAdmin: userIsAdmin,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  useEffect(() => {
    async function getUsers() {
      const data = await getAllUsers(company.id);
      setUsers(data);
    }
    getUsers();
  }, []);

  const handleName = (profile) => {
    return profile.firstName + " " + profile.lastName;
  };

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
          <UsersTable handleOpen={handleOpen} handleName={handleName} />
          <Modal open={open} onClose={handleClose}>
            <SignUp setOpen={setOpen} />
          </Modal>
        </Container>
      </Fragment>
    );
  }
};

export default Users;
