import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import React from "react";
import { LogoProps } from "../../interfaces";

const Logo: React.FC<LogoProps> = ({ login, footer }) => {
  return (
    <Link to="/" className="router-link">
      <Box
        sx={{
          display: login ? { xs: "none", md: "flex" } : "flex",
          cursor: "pointer",
        }}
      >
        <img
          src={logo}
          alt="logo"
          width={64}
          height={64}
          className={!login && !footer ? "logo" : "logo-login"}
        />
        <Typography
          color="textPrimary"
          sx={{
            fontFamily: "'Lexend Variable', sans-serif;",
            fontWeight: "500",
            fontSize:
              !login && !footer
                ? { xs: "1.25rem", sm: "1.5rem", lg: "2.25rem" }
                : { xs: "1.25rem", sm: "1rem", lg: "1.35rem" },
          }}
        >
          Rapply
        </Typography>
      </Box>
    </Link>
  );
};

const TitleLogo = () => {
  return (
    <Link to="/" className="router-link">
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          width={36}
          height={36}
          style={{ marginTop: ".25rem" }}
        />
        <Typography
          color="textPrimary"
          sx={{
            fontFamily: "'Lexend Variable', sans-serif;",
            fontWeight: "500",
            fontSize: "1.75rem",
          }}
        >
          Rapply
        </Typography>
      </Box>
    </Link>
  );
};

const CollapsedTitleLogo = () => {
  return (
    <Link to="/" className="router-link">
      <img src={logo} alt="logo" width={40} height={40} />
    </Link>
  );
};

export { TitleLogo, CollapsedTitleLogo };

export default Logo;
