import React from "react";
import { Button } from "@mui/material";

const Tab: React.FC<any> = ({ name, selected, handleClick }) => {
  return (
    <Button
      variant={selected ? "contained" : "text"}
      sx={{
        backgroundColor: selected ? "#6505b0" : "",
        fontFamily: "'Poppins', sans-serif;",
      }}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

export default Tab;
