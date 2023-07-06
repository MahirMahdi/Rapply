import AuthLayout from "../../components/auth/layout";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUpdatePassword } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { resetPasswordVariables } from "../../interfaces";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId") ?? "";
  const secret = searchParams.get("secret") ?? "";
  const { mutate: updatePassword } =
    useUpdatePassword<resetPasswordVariables>();

  const handleResetPassword = async () => {
    try {
      updatePassword({
        userId: userId,
        secret: secret,
        password: password,
        confirmPassword: confirmPassowrd,
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
          Reset Password.
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif;",
            fontWeight: "500",
            fontSize: { xs: ".75rem", sm: ".75rem", lg: ".85rem" },
          }}
        >
          Please enter your new password.
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
          label="New password"
          type="password"
          required={true}
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm new password"
          type="password"
          required={true}
          color="secondary"
          value={confirmPassowrd}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleResetPassword}
          type="button"
        >
          Submit
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default ResetPassword;
