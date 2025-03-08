import { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useColorMode from "../../hooks/useColorMode";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { account, appwriteClient } from "../../utility";
import { useRegister } from "@refinedev/core";
import AuthLayout from "../../components/auth/layout";
import { RegisterVariables } from "../../interfaces";
import { OAuthProvider } from "appwrite";
const Signup = () => {
  const { mode } = useColorMode();
  const { mutate: register } = useRegister<RegisterVariables>();
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      register({
        email: signupDetails.email,
        password: signupDetails.password,
        name: signupDetails.firstName + " " + signupDetails.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    try {
      account.createOAuth2Session(
        OAuthProvider.Google
        ,
        `${import.meta.env.VITE_CLIENT_URL}/profile`
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
          Create an account.
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif;",
            fontWeight: "500",
            fontSize: { xs: ".75rem", sm: ".75rem", lg: ".85rem" },
          }}
        >
          Please enter your details to sign up
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2.5rem",
          display: "flex",
          flexDirection: "column",
          rowGap: ".75rem",
          width: { xs: "60%", md: "90%" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ width: "47.5%" }}
            label="First name"
            type="text"
            required={true}
            color="secondary"
            value={signupDetails.firstName}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                firstName: e.target.value,
              })
            }
          />
          <TextField
            sx={{ width: "47.5%" }}
            label="Last name"
            type="text"
            required={true}
            color="secondary"
            value={signupDetails.lastName}
            onChange={(e) =>
              setSignupDetails({
                ...signupDetails,
                lastName: e.target.value,
              })
            }
          />
        </Box>
        <TextField
          label="Email"
          type="email"
          required={true}
          color="secondary"
          value={signupDetails.email}
          onChange={(e) =>
            setSignupDetails({
              ...signupDetails,
              email: e.target.value,
            })
          }
        />
        <TextField
          label="Password"
          type="password"
          required={true}
          color="secondary"
          value={signupDetails.password}
          onChange={(e) =>
            setSignupDetails({
              ...signupDetails,
              password: e.target.value,
            })
          }
        />
      </Box>
      <Button
        sx={{
          backgroundColor: "#6505b0",
          color: "white",
          width: { xs: "60%", md: "90%" },
          marginTop: "2.5rem",
          paddingY: ".5rem",
          fontSize: "1rem",
          fontFamily: "'Poppins',sans-serif",
        }}
        onClick={handleSignup}
        type="button"
      >
        Sign up
      </Button>
      <Button
        variant="outlined"
        onClick={handleGoogleAuth}
        startIcon={<FcGoogle />}
        sx={{
          width: { xs: "60%", md: "90%" },
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
        Sign up with google
      </Button>
      <Typography
        sx={{
          marginTop: "2rem",
          fontSize: ".95rem",
          fontFamily: "'Poppins',sans-serif",
        }}
      >
        Already have an account?{" "}
        <Link to="/login" className="router-link">
          <span
            className="signup-text"
            style={{
              color: mode === "light" ? "#6505B0" : "rgba(218, 0, 252, .75)",
              cursor: "pointer",
              fontWeight: mode === "dark" ? "bold" : "600",
            }}
          >
            Sign in.
          </span>
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Signup;
