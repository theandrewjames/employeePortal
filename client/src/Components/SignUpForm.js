import React from "react";

export const SignUpForm = {
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
