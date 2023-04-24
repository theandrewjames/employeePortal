import { Label } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Input,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";

const styledModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  //   bgcolor: "#051622",
  border: "2px solid #000",
  //   color: "#DEB992",
  textAlign: "center",
};

const styledInput = {
  //   color: "#DEB992",
  color: "black",
};

const SignUp = () => {
  const [admin, setAdmin] = useState(false);

  const handleSignUp = () => {
    alert("User signed up!!");
  };

  return (
    <Box sx={{ ...styledModal, width: "50%", height: "70%" }}>
      <FormControl>
        <Input sx={{ ...styledInput }} type="text" placeholder="first name" />
        <Input sx={{ ...styledInput }} type="text" placeholder="last name" />
        <Input sx={{ ...styledInput }} type="email" placeholder="email" />
        <Input sx={{ ...styledInput }} type="password" placeholder="password" />
        <Input
          sx={{ ...styledInput }}
          type="password"
          placeholder="confirm password"
        />

        <h1>Make user an admin role?</h1>
        <Select
          label="Pick an option"
          value={admin}
          autoWidth
          id="select-for-user-admin"
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
        <Button
          variant="contained"
          style={{ background: "#1BA098", borderRadius: "15px" }}
          onClick={handleSignUp}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default SignUp;
