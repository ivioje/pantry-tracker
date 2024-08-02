"use client";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      marginTop={100}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Rhoda Ikhuohon-Eboreime
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
