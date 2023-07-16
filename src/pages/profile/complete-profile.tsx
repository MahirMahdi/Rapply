import Typography from "@mui/material/Typography";
import {
  Box,
  Paper,
  TextField,
  InputLabel,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { useEffect, useState, ChangeEvent } from "react";
import { account, database, storage } from "../../utility";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import ProgressStepper from "../../components/profile/stepper";
import { FileUploadButton } from "../../components/buttons";
import { useGetIdentity } from "@refinedev/core";
import { User } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

const CompleteProfileInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId") ?? "";
  const secret = searchParams.get("secret") ?? "";
  const { data: user } = useGetIdentity<User>();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    phone_number: "",
    email: "",
    location: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    portfolio: "",
    linkedin: "",
    twitter: "",
    github: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [disableCondition, setDisableCondition] = useState(true);

  const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result as string;
        setSelectedImageUrl(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
    setPhoto(selectedFile || null);
  };

  const verifyUser = async () => {
    const user = await account.get();
    if (user?.emailVerification === false) {
      try {
        await account.updateVerification(userId, secret);
      } catch (error) {
        return error;
      }
    }
  };

  const checkIfProfileIsCompleted = async () => {
    try {
      await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
        user?.$id ?? ""
      );

      navigate("/profile");
      return;
    } catch (error) {
      return;
    }
  };

  const isStepOptional = (step: number) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleStepBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkipStep = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const validateRequiredFields = () => {
    const fields = [
      personalInfo.first_name,
      personalInfo.last_name,
      personalInfo.job_title,
    ];

    const result = fields.filter(
      (field) => field === null || field.length === 0
    );

    if (result.length > 0) {
      setDisableCondition(true);
    } else {
      setDisableCondition(false);
    }
  };

  const submitInformation = async () => {
    try {
      const photoId = uuidv4();
      const resumeId = uuidv4();
      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
        user?.$id ?? "",
        personalInfo
      );

      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SOCIALS_COLLECTION_ID,
        user?.$id ?? "",
        socialLinks
      );

      photo &&
        (await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          photoId,
          photo
        ));

      await account.updatePrefs({ photoId: photoId });
      return navigate("/profile-completed");
    } catch (error) {
      return error;
    }
  };

  const splitName = (type: string) => {
    const names = user?.name.split(" ") || [];
    const first_name = names[0] || "";
    const last_name = names.slice(1).join(" ") || "";

    return type === "first" ? first_name : last_name;
  };

  const formComponents = [
    {
      form: (
        <>
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
              fontFamily: "'Poppins', sans-serif;",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Personal Information
          </Typography>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>First Name</InputLabel>
              <TextField
                color="secondary"
                type="text"
                required
                fullWidth
                placeholder="First name"
                value={personalInfo.first_name}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    first_name: e.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>Last Name</InputLabel>
              <TextField
                color="secondary"
                type="text"
                required
                fullWidth
                placeholder="Last Name"
                value={personalInfo.last_name}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    last_name: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel>Email(Read only)</InputLabel>
            <TextField
              color="secondary"
              fullWidth
              aria-readonly
              type="email"
              value={personalInfo.email}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>Job Title</InputLabel>
              <TextField
                color="secondary"
                type="text"
                required
                fullWidth
                placeholder="Ex: Software Engineer"
                value={personalInfo.job_title}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    job_title: e.target.value,
                  })
                }
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>Phone Number(Optional)</InputLabel>
              <TextField
                color="secondary"
                type="number"
                fullWidth
                placeholder="Ex: +12345678"
                value={personalInfo.phone_number}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    phone_number: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel>Location(Optional)</InputLabel>
            <TextField
              color="secondary"
              type="text"
              fullWidth
              placeholder="Ex: Tokyo, Japan"
              value={personalInfo.location}
              onChange={(e) =>
                setPersonalInfo({
                  ...personalInfo,
                  location: e.target.value,
                })
              }
            />
          </Box>
        </>
      ),
    },
    {
      form: (
        <>
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
              fontFamily: "'Poppins', sans-serif;",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Social Links
          </Typography>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel>Portfolio(Optional)</InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="Ex: www.example.com"
              value={socialLinks.portfolio}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, portfolio: e.target.value })
              }
            />
            <FormHelperText>Personal Website</FormHelperText>
          </Box>
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              columnGap: "1rem",
              rowGap: "1rem",
              justifyContent: { sm: "center" },
            }}
          >
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>LinkedIn(Optional)</InputLabel>
              <TextField
                color="secondary"
                type="text"
                fullWidth
                placeholder="Ex: linkedin.com/in/abc"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
              />
            </Box>
            <Box
              sx={{ width: { sm: "50%" }, display: "grid", rowGap: ".5rem" }}
            >
              <InputLabel>Twitter(Optional)</InputLabel>
              <TextField
                color="secondary"
                type="text"
                fullWidth
                placeholder="Ex: twitter.com/xyz"
                value={socialLinks.twitter}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", rowGap: ".5rem" }}>
            <InputLabel>Github(Optional)</InputLabel>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              placeholder="Ex: github.com/efg"
              value={socialLinks.github}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, github: e.target.value })
              }
            />
          </Box>
        </>
      ),
    },
    {
      form: (
        <>
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", lg: "1.75rem" },
              fontFamily: "'Poppins', sans-serif;",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Upload a photo
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "1.5rem",
            }}
          >
            <Avatar
              sx={{ width: "5.5rem", height: "5.5rem" }}
              src={selectedImageUrl ?? ""}
              alt="uploaded-photo"
            />
            <FileUploadButton
              name="Photo"
              handleFileChange={uploadPhoto}
              file={photo}
            />
          </Box>
        </>
      ),
    },
  ];

  useEffect(() => {
    verifyUser();
  }, [userId, secret]);

  useEffect(() => {
    checkIfProfileIsCompleted();
    setPersonalInfo({
      first_name: splitName("first"),
      last_name: splitName("last"),
      job_title: "",
      phone_number: "",
      email: user?.email ?? "",
      location: "",
    });
  }, [user]);

  useEffect(() => {
    validateRequiredFields();
  }, [personalInfo]);

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        paddingY: "2.5rem",
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
      <Typography
        sx={{
          width: { xs: "90%", md: "75%", lg: "50%" },
          textAlign: "center",
        }}
      >
        Please complete your profile with accurate and up-to-date information to
        make the most of our platform and ensure a better, efficient user
        experience. Thank you!
      </Typography>
      <Paper
        sx={{
          width: { xs: "90%", md: "75%", lg: "50%" },
          mt: "3.5rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          rowGap: "1rem",
          boxShadow: {
            xs: "none",
            md: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          },
        }}
      >
        {formComponents[activeStep].form}
        <ProgressStepper
          handleNextStep={handleNextStep}
          handleStepBack={handleStepBack}
          handleSkipStep={handleSkipStep}
          handleSubmit={submitInformation}
          activeStep={activeStep}
          skipped={skipped}
          disableCondition={disableCondition}
        />
      </Paper>
    </Box>
  );
};

export default CompleteProfileInfo;
