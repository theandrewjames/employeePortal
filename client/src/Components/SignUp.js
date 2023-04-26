import { Box } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { allUsersState, companyState, errorState } from "../globalstate";
import { createUser } from "../Services/users";
import { SignUpForm } from "./SignUpForm";

const Form = styled.div`
  background: #051622;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  color: #deb992;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: 25px;
  padding: 10px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #deb992;
  padding: 7px 15px;
  margin: 5px 0;
  width: 60%;
  color: #deb992;
  &::placeholder {
    color: #deb992;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: #1ba098;
  border-radius: 10.2875px;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 12px 45px;
  font-weight: bold;
  cursor: pointer;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.6s ease-in-out;
  text-align: center;
  z-index: 100;
  width: 50%;
  height: 70%;
`;

const StyledSelect = styled.select`
  text-align: center;
  height: 60%;
  width: 80%;
`;

const SignUp = (props) => {
  const { setOpen } = props;
  const options = ["False", "True"];

  const company = useRecoilValue(companyState);
  const setNewUser = useSetRecoilState(allUsersState);

  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [form, setForm] = useState(SignUpForm);
  const [formError, setFormError] = useRecoilState(errorState);

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
          setForm(SignUpForm);
          setOpen(false);
          setNewUser([...allUsersState, data]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSelect = (event) => {
    event.target.value === "False"
      ? setUserIsAdmin(false)
      : setUserIsAdmin(true);
  };

  return (
    <StyledModal>
      <Form>
        {Object.entries(form).map(([key, props]) => (
          <Fragment>
            <Input
              key={key}
              {...props}
              onChange={(e) => {
                console.log(form);
                setForm({
                  ...form,
                  [key]: { ...props, value: e.target.value },
                });
                resetError();
              }}
            />
            {formError.isError && formError.field === key ? (
              <p
                style={{
                  color: "palevioletred",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {formError.message}
              </p>
            ) : (
              ""
            )}
          </Fragment>
        ))}

        <div style={{ margin: "25px" }}>
          <Title>Make user an admin role?</Title>
          <StyledSelect onChange={handleSelect}>
            <option>Pick an option!</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </StyledSelect>
        </div>

        <Button onClick={handleSignUp}>Sign Up</Button>
        {formError.isError && !formError.field ? (
          <p
            style={{
              color: "palevioletred",
              width: "100%",
              textAlign: "center",
            }}
          >
            {formError.message}
          </p>
        ) : (
          ""
        )}
      </Form>
    </StyledModal>
  );
};

export default SignUp;
