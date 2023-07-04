import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useForgotPassword } from "@refinedev/core";

type forgotPasswordVariables = {
  email: string;
  redirect_path: string;
};

const RecoveryEmailSuccess = () => {
  const params = useParams();
  const email = params.email?.substring(6) ?? "";
  const { mutate: forgotPassword } =
    useForgotPassword<forgotPasswordVariables>();

  const sendAgain = async () => {
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
          Recovery Email Sent
        </Typography>
        <VerifiedIcon
          sx={{
            color: "green",
            fontSize: { xs: "1.75rem", sm: "2rem", lg: "2.5rem" },
            mb: ".5rem",
          }}
        />
      </Box>
      <Typography sx={{ textAlign: "center", width: { xs: "90%", md: "60%" } }}>
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

export default RecoveryEmailSuccess;
