import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";

const PasswordRecovered = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: ".5rem",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", lg: "2.5rem" },
            fontFamily: "'Poppins', sans-serif;",
            fontWeight: "500",
            paddingBottom: ".5rem",
          }}
        >
          Password Reset Successful!
        </Typography>
        <VerifiedIcon
          sx={{
            color: "green",
            fontSize: { xs: "1.75rem", sm: "2rem", lg: "2.5rem" },
            mb: ".5rem",
          }}
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          width: { xs: "90%", md: "60%" },
        }}
      >
        Your password has been successfully reset. You're all set to securely
        access your account.
      </Typography>
      <Button
        href="/login"
        variant="contained"
        sx={{
          width: "fit-content",
          backgroundColor: "#6505b0",
          mt: "2.5rem",
        }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default PasswordRecovered;
