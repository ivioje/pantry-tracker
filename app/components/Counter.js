"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, ButtonGroup, Container, TextField } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: blueGrey[50],
  borderColor: blueGrey[200],
  "&:hover": {
    backgroundColor: blueGrey[100],
    borderColor: blueGrey[300],
  },
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
      borderColor: blueGrey[200],
    },
    "&:hover fieldset": {
      borderColor: blueGrey[300],
    },
    "&.Mui-focused fieldset": {
      borderColor: blueGrey[500],
    },
    "& input": {
      textAlign: "center",
      width: 60,
      color: blueGrey[700],
    },
  },
});

const Counter = ({ newItem, setNewItem }) => {
  const handleChange = (event) => {
    const value = Math.max(Number(event.target.value), 1);
    setCount(value);
    setNewItem({ ...newItem, quantity: value });
  };

  return (
    <Container className="flex items-center">
      <ButtonGroup>
        <StyledButton
          onClick={() =>
            setNewItem({ ...newItem, quantity: newItem.quantity - 1 })
          }
          disabled={newItem.quantity === 1}
        >
          <RemoveIcon fontSize="small" />
        </StyledButton>
        <StyledInput
          size="small"
          onChange={handleChange}
          value={newItem.quantity}
        />
        <StyledButton
          onClick={() =>
            setNewItem({ ...newItem, quantity: newItem.quantity + 1 })
          }
        >
          <AddIcon fontSize="small" />
        </StyledButton>
      </ButtonGroup>
    </Container>
  );
};

export default Counter;
