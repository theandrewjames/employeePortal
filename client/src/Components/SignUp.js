import { Box } from "@mui/material";
import React, { Fragment } from "react";
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
  width: "50%",
  height: "70%",
};

const SignUp = (props) => {
  const {
    handleChange,
    handleSignUp,
    userInfo,
    setUserIsAdmin,
    form,
    setForm,
    formError,
    resetError,
  } = props;
  const options = ["False", "True"];

  const handleSelect = (event) => {
    event.target.value === "False"
      ? setUserIsAdmin(false)
      : setUserIsAdmin(true);
  };

  return (
    <Box sx={{ ...styledModal }}>
      {/* <Form onSubmit={handleSignUp}>
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            value={userInfo[input.name]}
            onChange={handleChange}
          />
        ))}

        <div style={{ margin: "25px" }}>
          <Title>Make user an admin role?</Title>
          <select onChange={handleSelect}>
            <option>Pick an option!</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <Button>Submit</Button>
      </Form> */}
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
        <Button>Sign Up</Button>
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
    </Box>
  );
};

export default SignUp;
