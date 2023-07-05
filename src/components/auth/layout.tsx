import React from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Logo from "../logo/index";
import useColorMode from "../../hooks/useColorMode";
import logo from "../../assets/logo.png";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useColorMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: { xs: "inherit", md: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { md: "center" },
        }}
      >
        <Paper
          elevation={mode === "dark" ? 3 : 1}
          sx={{
            position: "relative",
            backgroundColor: {
              md: mode === "light" ? "inherit" : "rgba(0,0,0,.35)",
            },
            width: { xs: "100%", md: "60%" },
            display: "flex",
            height: "fit-content",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: "1.5rem 0", md: "4.5rem 1.5rem" },
            // boxShadow: {
            //   xs: "none",
            //   md: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            // },
          }}
        >
          <Logo login={true} footer={false} />
          {children}
        </Paper>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { md: "50%" },
          height: { xs: "20vh", md: "100%" },
          backgroundColor: { xs: "inherit", md: "#C0DBEA" },
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          width={192}
          height={192}
          className="auth-blurr-logo"
        />
        <Box
          sx={{
            width: "100%",
            height: { xs: "55%", md: "52.5%" },
            position: "absolute",
            bottom: 0,
            background: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 0 0 0 rgba(31, 38, 135, 0.27)",
            backdropFilter: { xs: "blur(2.5px)", md: "blur(7.5px)" },
            WebkitBackdropFilter: { xs: "blur(2.5px)", md: "blur(7.5px)" },
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
