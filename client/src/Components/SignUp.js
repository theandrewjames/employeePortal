import { Box } from "@mui/material";
import React from "react";
import { useRef } from "react";
import styled from "styled-components";

const Form = styled.form`
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
`;

const Input = styled.input`
  background-color: black;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  color: #deb992;
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

const styledModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: "transform 0.6s ease-in-out",
  textAlign: "center",
  zIndex: 100,
};

const SignUp = (props) => {
  const { handleChange, handleSignUp, inputs, userInfo, setUserInfo } = props;

  return (
    <Box sx={{ ...styledModal, width: "50%", height: "70%" }}>
      <Form onSubmit={handleSignUp}>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            value={userInfo[input.name]}
            onChange={handleChange}
          />
        ))}
        <Title>Make user an admin role?</Title>
        <select
          value={userInfo.isAdmin}
          onChange={(e) => (setUserInfo.isAdmin = e.target.value)}
        >
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <Button>Submit</Button>
      </Form>
    </Box>
  );
};

export default SignUp;
