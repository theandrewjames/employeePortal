import { Navigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import { Modal } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import SignUp from "../../Components/SignUp";
import UsersTable from "../../Components/UsersTable";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  allUsersState,
  companyState,
  errorState,
  userState,
} from "../../globalstate";
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

const initialFormState = {
  firstName: {
    value: "",
    placeholder: "First Name",
    type: "text",
  },
  lastName: {
    value: "",
    placeholder: "Last Name",
    type: "text",
  },
  email: {
    value: "",
    placeholder: "Email",
    type: "email",
  },
  phone: {
    value: "",
    placeholder: "123-456-7890",
    type: "tel",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
  },
  username: {
    value: "",
    placeholder: "Username",
    type: "text",
  },
  password: {
    value: "",
    placeholder: "Password",
    type: "password",
  },
  confirmPassword: {
    value: "",
    placeholder: "Confirm Password",
    type: "password",
  },
};

const Users = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(allUsersState);
  const [company, setCompany] = useRecoilState(companyState);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [formError, setFormError] = useRecoilState(errorState);
  const [newUser, setNewUser] = useState(false);
  const resetError = () => setFormError(errorState);

  const formIsValid = () => {
    if (
      !form.firstName.value ||
      !form.lastName.value ||
      !form.email.value ||
      !form.phone.value
    ) {
      setFormError({
        ...formError,
        isError: true,
        message: "All fields are required",
      });
      return false;
    } else if (
      !form.email.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setFormError({
        ...formError,
        isError: true,
        message: "Email must be in format a-z@a-z.com",
        field: "email",
      });
    } else if (form.password.value !== form.confirmPassword.value) {
      setFormError({
        ...formError,
        isError: true,
        message: "Passwords doen't match",
        field: "password",
      });
    }
    return true;
  };

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

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(form);

    if (formIsValid()) {
      createUser(company.id, {
        credentials: {
          username: form.username.value,
          password: form.password.value,
        },
        profile: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          phone: form.phone.value,
        },
        admin: userIsAdmin,
      })
        .then((data) => {
          setForm(initialFormState);
          setOpen(false);
          setNewUser(true);
          // setUsers([...users, data]);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    async function getUsers() {
      const data = await getAllUsers(company.id);
      setUsers(data);
    }
    getUsers();
  }, [newUser]);

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
            <SignUp
              handleSignUp={handleSignUp}
              setUserIsAdmin={setUserIsAdmin}
              form={form}
              setForm={setForm}
              formError={formError}
              resetError={resetError}
            />
          </Modal>
        </Container>
      </Fragment>
    );
  }
};

export default Users;
