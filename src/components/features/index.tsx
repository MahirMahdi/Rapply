import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FeatureCardProps } from "../../interfaces";
import useColorMode from "../../hooks/useColorMode";

const FeatureCard: React.FC<FeatureCardProps> = ({
  description,
  name,
  logo,
}) => {
  const { mode } = useColorMode();
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        display: "grid",
        borderRadius: "10px",
        rowGap: "1rem",
        cursor: "pointer",
        backgroundColor: mode === "dark" ? "#121212" : "#fff",
        "&:hover": {
          background: mode === "light" ? "#f7f2f7" : "#323130",
        },
        padding: "1rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {logo}
        <Typography>{name}</Typography>
      </Box>
      <Typography>{description}</Typography>
    </Paper>
  );
};

export default FeatureCard;
