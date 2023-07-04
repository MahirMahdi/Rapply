import AuthLayout from "../../components/auth/layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import useColorMode from "../../hooks/useColorMode";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "@refinedev/core";
import { account } from "../../utility";

type LoginVariables = {
  email: string;
  password: string;
};

const Login = () => {
  const { mode } = useColorMode();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { mutate: login } = useLogin<LoginVariables>();

  const handleLogin = async () => {
    try {
      login({
        email: loginDetails.email,
        password: loginDetails.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    try {
      account.createOAuth2Session(
        "google",
        `${import.meta.env.VITE_CLIENT_URL}/oauth/redirect`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          display: "grid",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Lexend Variable', sans-serif;",
            fontWeight: "500",
            fontSize: { xs: "2rem", md: "1.75rem" },
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif;",
            fontWeight: "500",
            fontSize: { xs: ".75rem", sm: ".75rem", lg: ".85rem" },
          }}
        >
          Please enter your login details
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2.5rem",
          display: "flex",
          flexDirection: "column",
          rowGap: ".75rem",
          width: { xs: "60%", md: "75%" },
        }}
      >
        <TextField
          label="Email"
          type="email"
          required={true}
          color="secondary"
          value={loginDetails.email}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, email: e.target.value })
          }
        />
        <TextField
          label="Password"
          type="password"
          required={true}
          color="secondary"
          value={loginDetails.password}
          onChange={(e) =>
            setLoginDetails({
              ...loginDetails,
              password: e.target.value,
            })
          }
        />
        <Link
          to="/forgot-password"
          className="router-link"
          style={{ placeSelf: "flex-end" }}
        >
          <Typography
            sx={{
              color: mode === "light" ? "#6505B0" : "rgba(218, 0, 252, .75)",
              fontSize: ".9rem",
              fontFamily: "'Poppins',sans-serif",
            }}
            className="forgot-password-text"
          >
            Forgot Password?
          </Typography>
        </Link>
        <Button
          sx={{
            backgroundColor: "#6505b0",
            color: "white",
            marginTop: "2.5rem",
            paddingY: ".5rem",
            fontSize: "1rem",
            fontFamily: "'Poppins',sans-serif",
          }}
          onClick={handleLogin}
          type="button"
        >
          Sign in
        </Button>
        <Button
          variant="outlined"
          onClick={handleGoogleAuth}
          startIcon={<FcGoogle />}
          sx={{
            marginTop: "1rem",
            paddingY: ".5rem",
            fontSize: "1rem",
            color: mode === "light" ? "#121212" : "rgba(255,255,255,0.85)",
            fontFamily: "'Poppins',sans-serif",
            borderColor:
              mode === "dark" ? "rgba(173,171,175,0.5)" : "rgba(18,18,18,0.45)",
            "&:hover": {
              borderColor: "#6505b0",
              backgroundColor: "#6505b0",
              color: "#fff",
            },
          }}
        >
          Sign in with google
        </Button>
        <Typography
          sx={{
            marginTop: "2rem",
            fontSize: ".95rem",
            fontFamily: "'Poppins',sans-serif",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link to="/signup" className="router-link">
            <span
              className="signup-text"
              style={{
                color: mode === "light" ? "#6505B0" : "rgba(218, 0, 252, .75)",
                fontWeight: mode === "dark" ? "bold" : "600",
                cursor: "pointer",
              }}
            >
              Sign up!
            </span>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default Login;
