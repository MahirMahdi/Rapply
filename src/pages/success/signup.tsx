import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import logo from "../../assets/logo.webp";
import Button from "@mui/material/Button";
import { account } from "../../utility";

const SignupSuccess = () => {
  const sendAgain = async () => {
    try {
      await account.createVerification(
        `${import.meta.env.VITE_CLIENT_URL}/complete/user-info`
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          Welcome to Rapply
        </Typography>
        <img
          src={logo}
          alt="logo"
          width={96}
          height={96}
          className="success-logo"
        />
      </Box>
      <Typography sx={{ textAlign: "center", width: { xs: "90%", md: "50%" } }}>
        Congratulations, your account has been successfully created! Please
        click on the verification link provided in the email to activate your
        account.
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          width: { xs: "90%", md: "60%" },
          mt: "1.5rem",
        }}
      >
        Didn't recieve the email? Please check the email address your used to
        make sure it matches the address on your account, look in your spam
        folder, or request another email below.
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "fit-content",
          backgroundColor: "#6505b0",
          mt: "2.5rem",
        }}
        onClick={sendAgain}
      >
        Send Again
      </Button>
    </Box>
  );
};

export default SignupSuccess;
