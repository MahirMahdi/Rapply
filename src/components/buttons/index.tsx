import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  href: string;
  name: string;
  placement: string | null;
  size: string;
}

interface OutlinedButtonProps {
  logo: any;
  href: string;
  name: string;
  placement: string | null;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  name,
  placement,
  size,
}) => {
  return (
    <Link
      to={href}
      style={{
        placeSelf: placement === "right" ? "flex-end" : "flex-start",
      }}
    >
      <button className="link-button" id={size === "sm" ? "sm-button" : ""}>
        {name}
      </button>
    </Link>
  );
};

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  logo,
  href,
  name,
  placement,
}) => {
  return (
    <Link
      to={href}
      style={{
        placeSelf: placement === "right" ? "flex-end" : "flex-start",
        textDecoration: "none",
      }}
    >
      <button className="outlined-button">
        {logo}
        {name}
      </button>
    </Link>
  );
};

export default LinkButton;
export { OutlinedButton };
