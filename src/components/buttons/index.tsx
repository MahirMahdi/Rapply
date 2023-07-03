import React from "react";
import { Link } from "react-router-dom";
import useColorMode from "../../hooks/useColorMode";
import { OutlinedButtonProps } from "../../interfaces";

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  logo,
  href,
  name,
  placement,
}) => {
  const { mode } = useColorMode();
  return (
    <Link
      to={href}
      style={{
        placeSelf: placement === "right" ? "flex-end" : "flex-start",
        textDecoration: "none",
      }}
    >
      <button
        className="outlined-button"
        id={mode === "dark" ? "outlined-button-dark" : ""}
      >
        {logo}
        {name}
      </button>
    </Link>
  );
};
