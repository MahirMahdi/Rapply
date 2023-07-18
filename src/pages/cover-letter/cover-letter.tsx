import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Switch,
  Divider,
  Chip,
  Typography,
  TextField,
  InputLabel,
  Paper,
  Icon,
  Tooltip,
  IconButton,
} from "@mui/material";
import { FcConferenceCall, FcReadingEbook, FcIdea } from "react-icons/fc";
import { OutlinedButton } from "../../components/buttons";
import useColorMode from "../../hooks/useColorMode";
import AddIcon from "@mui/icons-material/Add";
import Typewriter from "react-ts-typewriter";
import { OpenAIApi, Configuration } from "openai";
import CoverLetterTemplateOne from "./template-one";
import CoverLetterTemplateTwo from "./template-two";
import { database } from "../../utility";
import { useGetIdentity, useUpdate } from "@refinedev/core";
import { User, PersonalInformation } from "../../interfaces/index";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckIcon from "@mui/icons-material/Check";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { FaCoins } from "react-icons/fa";
import CustomSnackbar from "../../components/resume/customSnackbar";
import { BsArrowRepeat } from "react-icons/bs";

const CoverLetter = () => {
  const { mode } = useColorMode();
  const { data: user } = useGetIdentity<User>();
  const { mutate: updateOne } = useUpdate<PersonalInformation>();
  const [tab, setTab] = useState("Personalised");
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInformation>();
  const [socials, setSocials] = useState({
    portfolio: "",
    linkedin: "",
  });
  const [edit, setEdit] = useState(false);
  const [template, setTemplate] = useState("one");
  const [copied, setCopied] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [intro, setIntro] = useState("Dear Hiring Manager,");
  const [body, setBody] = useState<string | null>(null);
  const [closing, setClosing] = useState("Best Regards,");
  const [tokensAlert, setTokensAlert] = useState(false);

  const deleteSkill = (name: string) => {
    setSkills((skills) => skills.filter((skill) => skill !== name));
  };

  const addSkill = () => {
    setSkills((skills) => [...skills, skill]);
    setSkill("");
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

  const getSocialLinks = async () => {
    if (user) {
      try {
        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SOCIALS_COLLECTION_ID,
          user.$id
        );

        const { twitter, github, portfolio, linkedin, ...rest } = response;
        setSocials({
          portfolio: portfolio,
          linkedin: linkedin,
        });
      } catch (error) {
        return error;
      }
    }
  };

  const generateCoverLetter = async () => {
    if (personalInfo && personalInfo.tokens > "1000") {
      setCoverLetter("Please be patient...");
      try {
        const configuration = new Configuration({
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const generic_prompt = `Generate a short and precise cover letter based on the job description. Job description: ${jobDescription.replace(
          /\n/g,
          " "
        )}.The cover letter should be divided into three paragraphs and should not exceed 750 characters.`;

        const personalised_prompt = `Generate a short and precise cover letter that showcases my skills, experience, and compatibility with the job description provided. My skills include ${skills.join(
          ", "
        )}, and I have gained valuable experience in ${description.replace(
          /\n/g,
          " "
        )}. Please refer to the job description provided (${jobDescription.replace(
          /\n/g,
          " "
        )}) to ensure the cover letter focuses solely on the relevant skills, experience, and qualifications. The cover letter should be divided into three paragraphs and should not exceed 750 characters.`;

        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content:
                tab === "personalised" ? personalised_prompt : generic_prompt,
            },
          ],
        });

        const response = completion?.data.choices[0]?.message?.content;
        const tokens = completion?.data.usage?.total_tokens;
        const updated_tokens = Number(personalInfo?.tokens) - (tokens ?? 0);

        updateOne({
          resource: import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
          values: { ...personalInfo, tokens: updated_tokens.toString() },
          id: user?.$id ?? "",
          successNotification: (data, values, resource) => {
            return {
              message: "Thanks for being patient.",
              description: "Successfully generated cover letter!",
              type: "success",
            };
          },
        });

        const all_parts = response?.split("\n\n");

        const body = all_parts?.slice(1, -1).join("\n\n ");

        setCoverLetter(response ?? "");
        setBody(body ?? "");
      } catch (error) {
        console.log(error);
      }
    } else {
      setTokensAlert(true);
    }
  };

  const copyContent = () => {
    const content = document.getElementById("cover")?.innerText;

    navigator.clipboard
      .writeText(content ?? "")
      .then(function () {
        setCopied(true);
      })
      .catch(function (error) {
        console.error("Copy failed:", error);
      });
  };

  const closeCopySnackbar = () => {
    setCopied(false);
  };

  const closeTokensAlert = () => {
    setTokensAlert(false);
  };

  useEffect(() => {
    getPersonalInformation();
  }, [user, coverLetter]);

  useEffect(() => {
    getSocialLinks();
  }, [user]);

  return (
    <Box
      sx={{
        mt: { xs: ".75rem", md: "0" },
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        rowGap: "5rem",
      }}
    >
      <Box
        sx={{
          width: { md: "40%" },
          height: { md: "100%" },
          display: "flex",
          flexDirection: "column",
          rowGap: "1.5rem",
        }}
      >
        <Box sx={{ display: "flex", columnGap: "1.25rem" }}>
          <OutlinedButton
            active={tab === "Personalised"}
            href="#"
            placement="left"
            name="Personalised"
            logo={<FcReadingEbook />}
            onClick={() => setTab("Personalised")}
          />
          <OutlinedButton
            active={tab === "Generic"}
            href="#"
            placement="left"
            name="Generic"
            logo={<FcConferenceCall />}
            onClick={() => setTab("Generic")}
          />
        </Box>
        <TextField
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          multiline={true}
          minRows={8}
          fullWidth
          placeholder="Write or copy your job description here"
        />
        {tab === "Generic" && (
          <Button
            variant="contained"
            color="secondary"
            onClick={generateCoverLetter}
            disabled={jobDescription.length === 0}
          >
            Generate Cover Letter
          </Button>
        )}
        {tab === "Personalised" && (
          <>
            <Paper sx={{ width: "100%", padding: ".75rem 1rem" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif;",
                  color: mode === "light" ? "#323130" : "inherit",
                  fontSize: "1.15rem",
                  fontWeight: "500",
                  textAlign: "center",
                  paddingBottom: "1rem",
                }}
              >
                Skills
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  columnGap: "1rem",
                  rowGap: "1rem",
                }}
              >
                {skills.map((skill, i) => (
                  <Chip
                    color="secondary"
                    key={i}
                    label={skill}
                    onDelete={() => deleteSkill(skill)}
                  />
                ))}
              </Box>
            </Paper>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                columnGap: "1rem",
                alignItems: "center",
              }}
            >
              <TextField
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                fullWidth
                placeholder="Write your skill here"
              />
              <Button
                color="secondary"
                variant="contained"
                sx={{ height: "90%" }}
                onClick={addSkill}
                disabled={skill.length === 0}
              >
                <AddIcon />
              </Button>
            </Box>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline={true}
              minRows={3}
              fullWidth
              placeholder="Briefly describe your relevant experience/project here"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={generateCoverLetter}
              disabled={
                skills.length === 0 ||
                description.length === 0 ||
                jobDescription.length === 0
              }
            >
              Generate Cover Letter
            </Button>
          </>
        )}
      </Box>
      {coverLetter.length > 0 && (
        <Box
          sx={{
            width: { md: "50%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif;",
                  color: mode === "light" ? "#323130" : "inherit",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                }}
              >
                {tab} Cover Letter
              </Typography>
              <Icon sx={{ fontSize: "2rem" }}>
                <FcIdea />
              </Icon>
            </Box>
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
                sx={{
                  fontSize: ".85rem",
                  fontFamily: "'Poppins', sans-serif;",
                }}
              >
                {personalInfo?.tokens}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              height: { xs: "1px", sm: "1.5px" },
              backgroundColor: mode === "light" ? "#121212" : "#fff",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingY: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: ".75rem",
              }}
            >
              <Switch
                color="secondary"
                checked={preview}
                onChange={() => setPreview(!preview)}
              />
              <InputLabel>Preview</InputLabel>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: ".75rem",
              }}
            >
              {preview && (
                <>
                  <Tooltip title="Template One">
                    <IconButton
                      onClick={() => setTemplate("one")}
                      color="secondary"
                    >
                      <LooksOneIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Template Two">
                    <IconButton
                      onClick={() => setTemplate("two")}
                      color="secondary"
                    >
                      <LooksTwoIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {!preview &&
                (edit ? (
                  <Tooltip title="Done">
                    <IconButton
                      onClick={() => setEdit(false)}
                      sx={{ color: "#6505B0" }}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => setEdit(true)}
                      sx={{ color: "#6505B0" }}
                    >
                      <AutoFixHighIcon />
                    </IconButton>
                  </Tooltip>
                ))}
            </Box>
          </Box>
          <Paper
            sx={{
              padding: !preview ? { xs: "1rem", sm: "1.25rem" } : "0",
              display: "grid",
              placeItems: "center",
              "&:hover": {
                background:
                  !preview && !edit
                    ? mode === "light"
                      ? "#F4F4F2"
                      : "#52616B"
                    : "",
              },
            }}
          >
            {preview ? (
              template === "one" ? (
                <CoverLetterTemplateOne
                  personal_info={personalInfo}
                  linkedin={socials.linkedin}
                  portfolio={socials.portfolio}
                  intro={intro}
                  body={body}
                  closing={closing}
                />
              ) : (
                <CoverLetterTemplateTwo
                  personal_info={personalInfo}
                  linkedin={socials.linkedin}
                  portfolio={socials.portfolio}
                  intro={intro}
                  body={body}
                  closing={closing}
                />
              )
            ) : edit ? (
              <Box sx={{ display: "grid", rowGap: "2.5rem", width: "100%" }}>
                <Box sx={{ display: "grid", rowGap: ".75rem" }}>
                  <InputLabel>Intro</InputLabel>
                  <TextField
                    fullWidth
                    onChange={(e) => setIntro(e.target.value)}
                    value={intro}
                  />
                </Box>
                <Box sx={{ display: "grid", rowGap: ".75rem" }}>
                  <InputLabel>Body</InputLabel>
                  <TextField
                    multiline={true}
                    minRows={10}
                    fullWidth
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                  />
                </Box>
                <Box sx={{ display: "grid", rowGap: ".75rem" }}>
                  <InputLabel>Closing</InputLabel>
                  <TextField
                    fullWidth
                    onChange={(e) => setClosing(e.target.value)}
                    value={closing}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                id="cover"
                onClick={copyContent}
                sx={{
                  whiteSpace: "pre-line",
                  cursor: "copy",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typewriter text={coverLetter} speed={1} />
                <Button
                  startIcon={<BsArrowRepeat />}
                  variant="contained"
                  color="secondary"
                  sx={{
                    position: "static",
                    placeSelf: "center",
                  }}
                  onClick={generateCoverLetter}
                >
                  Regenerate response
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      )}
      <CustomSnackbar
        message="Copied to clipboard!"
        close={closeCopySnackbar}
        open={copied}
      />
      <CustomSnackbar
        message="Sorry, you have not enough tokens."
        close={closeTokensAlert}
        open={tokensAlert}
      />
    </Box>
  );
};

export default CoverLetter;
