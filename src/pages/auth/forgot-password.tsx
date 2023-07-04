import AuthLayout from "../../components/auth/layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import useColorMode from "../../hooks/useColorMode";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForgotPassword } from "@refinedev/core";

type forgotPasswordVariables = {
  email: string;
  redirect_path: string;
};

const ForgotPassword = () => {
  const { mode } = useColorMode();
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword } =
    useForgotPassword<forgotPasswordVariables>();

  const handleRecoveryEmail = async () => {
    try {
      forgotPassword({
        email: email,
        redirect_path: `${import.meta.env.VITE_CLIENT_URL}/reset-password`,
      });
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
          Forgot Password?
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif;",
            fontWeight: "500",
            fontSize: { xs: ".75rem", sm: ".75rem", lg: ".85rem" },
          }}
        >
          Please enter your email
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          sx={{
            backgroundColor: "#6505b0",
            color: "white",
            marginTop: "2.5rem",
            paddingY: ".5rem",
            fontSize: "1rem",
            fontFamily: "'Poppins',sans-serif",
          }}
          onClick={handleRecoveryEmail}
          type="button"
        >
          Send Recovery Email
        </Button>
        <Typography
          sx={{
            marginTop: "2rem",
            fontSize: ".95rem",
            fontFamily: "'Poppins',sans-serif",
            textAlign: "center",
          }}
        >
          Remebered password?{" "}
          <Link to="/signin" className="router-link">
            <span
              className="signup-text"
              style={{
                color: mode === "light" ? "#6505B0" : "rgba(218, 0, 252, .75)",
                fontWeight: mode === "dark" ? "bold" : "600",
                cursor: "pointer",
              }}
            >
              Sign in.
            </span>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;
