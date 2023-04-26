import { Box } from "@mui/material";
import React, { Fragment } from "react";
import styled from "styled-components";

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
  const { handleSignUp, setUserIsAdmin, form, setForm, formError, resetError } =
    props;
  const options = ["False", "True"];

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

        {/* <Input
          placeholder="First Name"
          type="text"
          onChange={(e) =>
            setForm({
              ...form,
              firstName: e.target.value,
            })
          }
        />
        <Input placeholder="Last Name" type="text" />
        <Input placeholder="Email" type="email" />
        <Input
          placeholder="Phone"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
        <Input placeholder="Username" type="text" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm Password" type="password" /> */}

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
