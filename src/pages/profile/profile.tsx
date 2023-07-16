import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  IconButton,
  TextField,
  Icon,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useGetIdentity } from "@refinedev/core";
import { User } from "../../interfaces/index";
import useColorMode from "../../hooks/useColorMode";
import { SocialLinks, PersonalInformation } from "../../interfaces/index";
import { account, database, storage } from "../../utility";
import {
  EditButton,
  SaveButton,
  CloseButton,
  FileUploadButton,
} from "../../components/buttons/index";
import { Link, useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { FaCoins } from "react-icons/fa";

const Profile = () => {
  const { mode } = useColorMode();
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<User>();
  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    phone_number: "",
    email: "",
    location: "",
    tokens: "",
  });
  const [socials, setSocials] = useState({
    portfolio: "",
    linkedin: "",
    twitter: "",
    github: "",
  });
  const [photo, setPhoto] = useState("");
  const [resume, setResume] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [editIntro, setEditIntro] = useState(false);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [updatedPersonalInfo, setUpdatedPersonalInfo] = useState<any>({
    first_name: "",
    last_name: "",
    job_title: "",
    phone_number: "",
    email: "",
    location: "",
  });
  const [editSocials, setEditSocials] = useState(false);
  const [updatedSocials, setUpdatedSocials] = useState({
    portfolio: "",
    linkedin: "",
    twitter: "",
    github: "",
  });
  const [editResume, setEditResume] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState<File | null>(null);
  const [updatedPhotoUrl, setUpdatedPhotoUrl] = useState<string | null>(null);
  const [updatedResume, setUpdatedResume] = useState<File | null>(null);

  const checkIfProfileIsCompleted = async () => {
    try {
      await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
        user?.$id ?? ""
      );

      return;
    } catch (error) {
      navigate("/complete/profile");
    }
  };

  const getSocialLinks = async () => {
    if (user) {
      try {
        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SOCIALS_COLLECTION_ID,
          user?.$id ?? ""
        );

        const { twitter, github, portfolio, linkedin, ...rest } = response;
        setSocials({
          twitter: twitter,
          github: github,
          portfolio: portfolio,
          linkedin: linkedin,
        });
      } catch (error) {
        return error;
      }
    }
  };

  const getPersonalInformation = async () => {
    if (user) {
      try {
        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
          user.$id
        );

        const {
          first_name,
          last_name,
          email,
          job_title,
          location,
          phone_number,
          tokens,
          ...rest
        } = response;
        setPersonalInfo({
          first_name: first_name,
          last_name: last_name,
          job_title: job_title,
          email: email,
          location: location,
          phone_number: phone_number,
          tokens: tokens,
        });
      } catch (error) {
        return error;
      }
    }
  };

  const getUserPhoto = async () => {
    if (user) {
      try {
        const response = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          user.prefs.photoId
        );

        setPhoto(response.href);
      } catch (error) {
        return error;
      }
    }
  };

  const getUserResume = async () => {
    if (user) {
      try {
        const response = storage.getFileDownload(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          user.prefs.resumeId
        );

        setResumeUrl(response.href);

        const data = storage.getFilePreview(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          user.prefs.resumeId
        );

        setResume(data.href);
      } catch (error) {
        return error;
      }
    }
  };

  const checkData = (data: string | undefined) => {
    if (data?.length === 0 || data === undefined) {
      return "Unavailable";
    }

    return data;
  };

  const changeIntroState = (state: string) => {
    if (state === "edit") {
      setEditIntro(true);
    } else {
      setEditIntro(false);
    }
  };

  const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result as string;
        setUpdatedPhotoUrl(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
    setUpdatedPhoto(selectedFile || null);
  };

  const checkIntroUpdateStatus = (): boolean => {
    return updatedPhotoUrl === null;
  };

  const updatePhoto = async () => {
    const prefs = user?.prefs;
    const photoId = uuidv4();

    try {
      if (prefs?.photoId !== "") {
        updatedPhoto &&
          (await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            prefs?.photoId ?? ""
          )) &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            photoId,
            updatedPhoto
          ));
        await account.updatePrefs({ ...prefs, photoId: photoId });
      } else {
        updatedPhoto &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            photoId,
            updatedPhoto
          ));
        await account.updatePrefs({ ...prefs, photoId: photoId });
      }
    } catch (error) {
      return error;
    }

    setEditIntro(false);
  };

  const changePersonalInfoState = (state: string) => {
    if (state === "edit") {
      setEditPersonalInfo(true);
    } else {
      setEditPersonalInfo(false);
    }
  };

  const checkPersonalInfoUpdateStatus = () => {
    const fields = [
      updatedPersonalInfo.first_name,
      updatedPersonalInfo.last_name,
      updatedPersonalInfo.job_title,
      updatedPersonalInfo.email,
    ];

    const result = fields.filter(
      (field) => field === null || field.length === 0
    );

    if (result.length > 0) {
      return true;
    } else {
      const all_keys = Object.keys(
        updatedPersonalInfo
      ) as (keyof PersonalInformation)[];
      const result = all_keys.filter(
        (key) => updatedPersonalInfo[key] !== personalInfo[key]
      );
      if (result.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  const updateUpdatedPersonalInfo = async () => {
    try {
      await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
        user?.$id ?? "",
        updatedPersonalInfo
      );

      setEditPersonalInfo(false);
    } catch (error) {
      return error;
    }
  };

  const changeSocialsState = (state: string) => {
    if (state === "edit") {
      setEditSocials(true);
    } else {
      setEditSocials(false);
    }
  };

  const checkSocialsUpdateStatus = () => {
    const all_keys = Object.keys(updatedSocials) as (keyof SocialLinks)[];
    const result = all_keys.filter(
      (key) => updatedSocials[key] !== socials[key]
    );
    if (result.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const updateUpdatedSocials = async () => {
    try {
      await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SOCIALS_COLLECTION_ID,
        user?.$id ?? "",
        updatedSocials
      );

      setEditSocials(false);
    } catch (error) {
      return error;
    }
  };

  const changeResumeState = (state: string) => {
    if (state === "edit") {
      setEditResume(true);
    } else {
      setEditResume(false);
    }
  };

  const uploadResume = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setUpdatedResume(selectedFile || null);
  };

  const checkResumeUpdateStatus = (): boolean => {
    return updatedResume === null;
  };

  const updateResume = async () => {
    const prefs = user?.prefs;
    const resumeId = uuidv4();

    try {
      if (prefs?.resumeId !== "") {
        updatedResume &&
          (await storage.deleteFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            prefs?.resumeId ?? ""
          )) &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            resumeId,
            updatedResume
          ));
        await account.updatePrefs({ ...prefs, resumeId: resumeId });
      } else {
        updatedResume &&
          (await storage.createFile(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            resumeId,
            updatedResume
          ));
        await account.updatePrefs({ ...prefs, resumeId: resumeId });
      }
    } catch (error) {
      return error;
    }

    setEditResume(false);
  };

  const personal_info = [
    { key: "First Name", value: checkData(personalInfo?.first_name) },
    { key: "Last Name", value: checkData(personalInfo?.last_name) },
    { key: "Email", value: checkData(personalInfo?.email) },
    { key: "Job Title", value: checkData(personalInfo?.job_title) },
    { key: "Location", value: checkData(personalInfo?.location) },
    { key: "Phone", value: checkData(personalInfo?.phone_number) },
  ];

  const edit_personal_info = [
    {
      key: "First Name",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="First name"
          value={updatedPersonalInfo.first_name}
          onChange={(e) =>
            setUpdatedPersonalInfo({
              ...updatedPersonalInfo,
              first_name: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Last Name",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Last name"
          value={updatedPersonalInfo.last_name}
          onChange={(e) =>
            setUpdatedPersonalInfo({
              ...updatedPersonalInfo,
              last_name: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Email",
      value: (
        <TextField
          color="secondary"
          type="email"
          required
          fullWidth
          placeholder="Email"
          value={updatedPersonalInfo.email}
        />
      ),
    },
    {
      key: "Job Title",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Job Title"
          value={updatedPersonalInfo.job_title}
          onChange={(e) =>
            setUpdatedPersonalInfo({
              ...updatedPersonalInfo,
              job_title: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Location",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Ex: Tokyo, Japan"
          value={updatedPersonalInfo.location}
          onChange={(e) =>
            setUpdatedPersonalInfo({
              ...updatedPersonalInfo,
              location: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Phone",
      value: (
        <TextField
          color="secondary"
          type="number"
          required
          fullWidth
          placeholder="+123456"
          value={updatedPersonalInfo.phone_number}
          onChange={(e) =>
            setUpdatedPersonalInfo({
              ...updatedPersonalInfo,
              phone_number: e.target.value,
            })
          }
        />
      ),
    },
  ];

  const social_links = [
    { key: "Portfolio", value: checkData(socials?.portfolio) },
    { key: "LinkedIn", value: checkData(socials?.linkedin) },
    { key: "Twitter", value: checkData(socials?.twitter) },
    { key: "Github", value: checkData(socials?.github) },
  ];

  const edit_social_links = [
    {
      key: "Portfolio",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Ex: www.example.com"
          value={updatedSocials.portfolio}
          onChange={(e) =>
            setUpdatedSocials({
              ...updatedSocials,
              portfolio: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "LinkedIn",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Ex: linkedin.com/in/abc"
          value={updatedSocials.linkedin}
          onChange={(e) =>
            setUpdatedSocials({
              ...updatedSocials,
              linkedin: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Twitter",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Ex: twitter.com/xyz"
          value={updatedSocials.twitter}
          onChange={(e) =>
            setUpdatedSocials({
              ...updatedSocials,
              twitter: e.target.value,
            })
          }
        />
      ),
    },
    {
      key: "Github",
      value: (
        <TextField
          color="secondary"
          type="text"
          required
          fullWidth
          placeholder="Ex: github.com/efg"
          value={updatedSocials.github}
          onChange={(e) =>
            setUpdatedSocials({
              ...updatedSocials,
              github: e.target.value,
            })
          }
        />
      ),
    },
  ];

  const intro = {
    read: (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "1.5rem",
          }}
        >
          <Avatar
            src={photo}
            alt="user-image"
            sx={{
              width: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
              height: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
              fontSize: { xs: "1.75rem", sm: "2.5rem" },
              bgcolor: "#6505B0",
              color: "white",
              zIndex: 1,
            }}
          >
            {user?.name.slice(0, 1)}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "500",
                color: mode === "light" ? "#323130" : "inherit",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "400",
                color: mode === "light" ? "GrayText" : "rgba(255,255,255,.85)",
                fontSize: { xs: ".8rem", sm: ".95rem" },
              }}
            >
              {personalInfo.job_title}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "400",
                color: mode === "light" ? "GrayText" : "rgba(255,255,255,.8)",
                fontSize: { xs: ".7rem", sm: ".8rem" },
              }}
            >
              {personalInfo.location}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: { xs: "0", sm: "2rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: ".25rem",
            }}
          >
            <Icon color="secondary" sx={{ fontSize: ".85rem" }}>
              <FaCoins />
            </Icon>
            <Typography
              sx={{ fontSize: ".85rem", fontFamily: "'Poppins', sans-serif;" }}
            >
              {personalInfo.tokens}
            </Typography>
          </Box>
          <EditButton handleClick={() => changeIntroState("edit")} />
        </Box>
      </>
    ),
    edit: (
      <>
        <CloseButton handleClick={() => changeIntroState("read")} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "1.5rem",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <label htmlFor="file-input">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                id="file-input"
                style={{ display: "none" }}
                onChange={(e) => uploadPhoto(e)}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  zIndex: 100,
                  left: { xs: ".75rem", sm: "1.5rem" },
                  top: { xs: ".75rem", sm: "1.5rem" },
                  color: "white",
                }}
                component="span"
              >
                <AddAPhotoIcon
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                />
              </IconButton>
            </label>
            <Avatar
              src={updatedPhotoUrl ?? photo}
              alt="user-image"
              sx={{
                width: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
                height: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
                fontSize: { xs: "1.75rem", sm: "2.5rem" },
                bgcolor: "#6505B0",
                color: "white",
                zIndex: 1,
              }}
            >
              {user?.name.slice(0, 1)}
            </Avatar>
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "500",
                color: mode === "light" ? "#323130" : "inherit",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "400",
                color: mode === "light" ? "GrayText" : "rgba(255,255,255,.85)",
                fontSize: { xs: ".8rem", sm: ".95rem" },
              }}
            >
              Software Engineer
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif;",
                fontWeight: "400",
                color: mode === "light" ? "GrayText" : "rgba(255,255,255,.8)",
                fontSize: { xs: ".7rem", sm: ".8rem" },
              }}
            >
              Remote
            </Typography>
          </Box>
        </Box>
        <SaveButton
          disableCondition={checkIntroUpdateStatus()}
          handleClick={updatePhoto}
        />
      </>
    ),
  };

  const personal_information = {
    read: (
      <>
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "1rem",
            }}
          >
            {personal_info.map(({ key, value }) => (
              <Grid
                key={key}
                container
                direction={{ xs: "row", sm: "column" }}
                alignItems="flex-start"
                sx={{
                  width: { xs: "100%", sm: "50%" },
                  columnGap: { sm: "1rem" },
                  boxSizing: "border-box",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif;",
                      fontWeight: "600",
                      color: mode === "light" ? "#323130" : "inherit",
                    }}
                  >
                    {key}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ wordBreak: "break-word" }}>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif;",
                      color: mode === "light" ? "#323130" : "inherit",
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
          <EditButton handleClick={() => changePersonalInfoState("edit")} />
        </Box>
      </>
    ),
    edit: (
      <>
        <CloseButton handleClick={() => changePersonalInfoState("read")} />
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "1rem",
            }}
          >
            {edit_personal_info.map(({ key, value }) => (
              <Grid
                key={key}
                container
                direction={{ xs: "row", sm: "column" }}
                alignItems="flex-start"
                sx={{
                  width: { xs: "100%", sm: "50%" },
                  columnGap: { sm: "1rem" },
                  boxSizing: "border-box",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif;",
                      fontWeight: "600",
                      color: mode === "light" ? "#323130" : "inherit",
                    }}
                  >
                    {key}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ wordBreak: "break-word" }}>
                  {value}
                </Grid>
              </Grid>
            ))}
          </Box>
          <SaveButton
            disableCondition={checkPersonalInfoUpdateStatus()}
            handleClick={updateUpdatedPersonalInfo}
          />
        </Box>
      </>
    ),
  };

  const social_links_states = {
    read: (
      <>
        <Box
          sx={{
            width: "100%",
            display: { xs: "grid", sm: "flex" },
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              rowGap: "1rem",
            }}
          >
            {social_links.map(({ key, value }) => (
              <Grid
                key={key}
                container
                direction="row"
                alignItems="flex-start"
                sx={{
                  width: { xs: "100%", sm: "50%" },
                  columnGap: { sm: "1rem" },
                  boxSizing: "border-box",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif;",
                      fontWeight: "600",
                      color: mode === "light" ? "#323130" : "inherit",
                    }}
                  >
                    {key}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ wordBreak: "break-word" }}>
                  <Link
                    to={checkData(value) === "Unavailable" ? "#" : value}
                    className="router-link"
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Inter', sans-serif;",
                        color:
                          checkData(value) === "Unavailable"
                            ? "inherit"
                            : "#6505B0",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {value}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            ))}
          </Box>
          <EditButton handleClick={() => changeSocialsState("edit")} />
        </Box>
      </>
    ),
    edit: (
      <>
        <CloseButton handleClick={() => changeSocialsState("read")} />
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            justifyContent: "space-between",
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "1rem",
            }}
          >
            {edit_social_links.map(({ key, value }) => (
              <Grid
                key={key}
                container
                direction={{ xs: "row", sm: "column" }}
                alignItems="flex-start"
                sx={{
                  width: { xs: "100%", sm: "40%", md: "50%" },
                  columnGap: { sm: "1rem" },
                  boxSizing: "border-box",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif;",
                      fontWeight: "600",
                      color: mode === "light" ? "#323130" : "inherit",
                    }}
                  >
                    {key}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ wordBreak: "break-word" }}>
                  {value}
                </Grid>
              </Grid>
            ))}
          </Box>
          <SaveButton
            disableCondition={checkSocialsUpdateStatus()}
            handleClick={updateUpdatedSocials}
          />
        </Box>
      </>
    ),
  };

  const resume_states = {
    read: (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: "2rem",
          }}
        >
          <Link to={resumeUrl}>
            <Avatar
              src={resume}
              variant="rounded"
              sx={{
                width: { xs: "6rem", sm: "7.5rem" },
                height: { xs: "7.5rem", sm: "9rem" },
              }}
            />
          </Link>
        </Box>
        <EditButton handleClick={() => changeResumeState("edit")} />
      </>
    ),
    edit: (
      <>
        <CloseButton handleClick={() => changeResumeState("read")} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: "2rem",
            rowGap: "1.5rem",
          }}
        >
          <Link to={resumeUrl}>
            <Avatar
              src={resume}
              variant="rounded"
              sx={{
                width: { xs: "6rem", sm: "7.5rem" },
                height: { xs: "7.5rem", sm: "9rem" },
              }}
            />
          </Link>
          <FileUploadButton
            name="Upload Resume"
            file={updatedResume}
            handleFileChange={uploadResume}
          />
        </Box>
        <SaveButton
          disableCondition={checkResumeUpdateStatus()}
          handleClick={updateResume}
        />
      </>
    ),
  };

  useEffect(() => {
    checkIfProfileIsCompleted();
  }, [user]);

  useEffect(() => {
    setUpdatedPersonalInfo({
      first_name: personalInfo?.first_name ?? "",
      last_name: personalInfo?.last_name ?? "",
      job_title: personalInfo?.job_title ?? "",
      phone_number: personalInfo?.phone_number ?? "",
      email: personalInfo?.email ?? "",
      location: personalInfo?.location ?? "",
    });
  }, [personalInfo]);

  useEffect(() => {
    setUpdatedSocials({
      portfolio: socials?.portfolio ?? "",
      linkedin: socials?.linkedin ?? "",
      twitter: socials?.twitter ?? "",
      github: socials?.github ?? "",
    });
  }, [socials]);

  useEffect(() => {
    getPersonalInformation();
  }, [user, editPersonalInfo]);

  useEffect(() => {
    getUserPhoto();
  }, [user, editIntro]);

  useEffect(() => {
    getSocialLinks();
  }, [user, editSocials]);

  useEffect(() => {
    getUserResume();
  }, [user, editResume]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
        rowGap: "1.5rem",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif;",
          fontWeight: "500",
          color: mode === "light" ? "#323130" : "inherit",
          fontSize: "1.5rem",
        }}
      >
        My profile
      </Typography>
      <Paper
        sx={{
          width: "100%",
          padding: { xs: "1rem", sm: "2rem" },
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {editIntro ? intro.edit : intro.read}
      </Paper>
      <Paper
        sx={{
          width: "100%",
          padding: { xs: "1rem", sm: "2rem" },
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontFamily: "'Poppins', sans-serif;",
            fontWeight: "500",
            color: mode === "light" ? "#323130" : "inherit",
            fontSize: "1.25rem",
          }}
        >
          Personal Information
        </Typography>
        {editPersonalInfo
          ? personal_information.edit
          : personal_information.read}
      </Paper>
      <Paper
        sx={{
          width: "100%",
          padding: { xs: "1rem", sm: "2rem" },
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontFamily: "'Poppins', sans-serif;",
            fontWeight: "500",
            color: mode === "light" ? "#323130" : "inherit",
            fontSize: "1.25rem",
          }}
        >
          Social Links
        </Typography>
        {editSocials ? social_links_states.edit : social_links_states.read}
      </Paper>
      <Paper
        sx={{
          width: "100%",
          padding: { xs: "1rem", sm: "2rem" },
          borderRadius: "1rem",
          display: "grid",
          placeItems: { xs: "center", sm: "flex-start" },
          position: "relative",
        }}
      >
        <Typography
          sx={{
            textAlign: { xs: "center", sm: "inherit" },
            width: "100%",
            fontFamily: "'Poppins', sans-serif;",
            fontWeight: "500",
            color: mode === "light" ? "#323130" : "inherit",
            fontSize: "1.25rem",
          }}
        >
          Resume
        </Typography>
        {editResume ? resume_states.edit : resume_states.read}
      </Paper>
    </Box>
  );
};

export default Profile;
