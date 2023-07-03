import React from "react";
import { Box, Typography } from "@mui/material";
import { FooterInfoProps } from "../../interfaces";

const FooterInfo: React.FC<FooterInfoProps> = ({ header, data }) => {
  return (
    <Box sx={{ display: "grid", placeItems: "center", rowGap: ".5rem" }}>
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif;",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        {header}
      </Typography>
      {data.map((name) => (
        <Typography sx={{ fontSize: ".85rem" }}>{name}</Typography>
      ))}
    </Box>
  );
};

export default FooterInfo;
