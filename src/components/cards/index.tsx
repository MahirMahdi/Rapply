import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  FAQCardProps,
  FeatureCardProps,
  TestimonialCardProps,
} from "../../interfaces";
import useColorMode from "../../hooks/useColorMode";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FeatureCard: React.FC<FeatureCardProps> = ({
  description,
  name,
  logo,
  selectCard,
  selected,
}) => {
  const { mode } = useColorMode();

  return (
    <Paper
      elevation={0}
      onClick={selectCard}
      sx={{
        width: "100%",
        display: "grid",
        borderRadius: "10px",
        rowGap: { xs: ".5rem", sm: ".75rem", md: "1rem" },
        cursor: "pointer",
        backgroundColor: {
          md: selected ? "#6505b0" : mode === "dark" ? "#121212" : "#fff",
          xs: mode === "dark" ? "#121212" : "#fff",
        },
        "&:hover": {
          md: {
            background: mode === "light" ? "#f7f2f7" : "#323130",
            color: mode === "light" ? "#403f40" : "#fff",
          },
        },
        color: { md: selected ? "#fff" : "" },
        padding: { xs: "1rem 0", md: "1rem" },
        textAlign: { xs: "center", md: "left" },
      }}
      id={name}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
        id={name}
      >
        {logo}
        <Typography sx={{ fontWeight: "600" }} id={name}>
          {name}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: { xs: ".85rem", md: ".95rem" } }} id={name}>
        {description}
      </Typography>
    </Paper>
  );
};

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  username,
  review,
  image,
}) => {
  const { mode } = useColorMode();

  return (
    <div
      className={
        mode === "light" ? "testimonial-card" : "testimonial-card dark-tc"
      }
    >
      <Box sx={{ display: "grid", rowGap: "1rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "1rem" }}>
          <Avatar src={image} alt={username} />
          <Typography>{username}</Typography>
        </Box>
        <Typography>{review}</Typography>
      </Box>
    </div>
  );
};

export const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  const { mode } = useColorMode();

  return (
    <Accordion
      sx={{
        backgroundColor: mode === "dark" ? "#000" : "inherit",
        boxShadow: "0px 0px 2px 0px rgba(214, 0, 250, 0.25)",
        WebkitBoxShadow: "0px 0px 2px 0px rgba(214, 0, 250, 0.25",
        MozBoxShadow: "0px 0px 2px 0px rgba(214, 0, 250, 0.25)",
      }}
      elevation={0}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: mode === "light" ? "inherit" : "white" }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FeatureCard;
