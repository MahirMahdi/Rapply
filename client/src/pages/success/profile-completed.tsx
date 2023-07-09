import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";

const ProfileCompleted = () => {
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
          Profile Completed!
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
        Your profile is ready. You're all set to use Rapply!
      </Typography>
      <Button
        href="/profile"
        variant="contained"
        sx={{
          width: "fit-content",
          backgroundColor: "#6505b0",
          mt: "2.5rem",
        }}
      >
        Go to Profile
      </Button>
    </Box>
  );
};

export default ProfileCompleted;
