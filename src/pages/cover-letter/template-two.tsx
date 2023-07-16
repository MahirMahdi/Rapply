import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Button, Typography, Divider } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const CoverLetterTemplateTwo: React.FC<any> = ({
  personal_info,
  linkedin,
  portfolio,
  intro,
  body,
  closing,
}) => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);
  const { email, phone_number, first_name, last_name, job_title } =
    personal_info;
  const date: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate: string = date.toLocaleString("en-US", options);

  const top_bar = [
    {
      icon: <EmailIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: email ? email : "dummyuser@email.com",
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: linkedin.length > 0 ? linkedin : "in/dummyuser",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: portfolio.length > 0 ? portfolio : "www.dummyuser.com",
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: phone_number ? phone_number : "+3243123213",
    },
  ];

  const fake_body = (
    <>
      I am writing to express my interest in the software engineer position at
      ABC company. With 5 years of experience and expertise in software
      development, I am confident that I would be a valuable addition to your
      team. <br />
      <br />
      My strong coding skills, collaborative nature, and proficiency in various
      programming languages and technologies enable me to effectively tackle
      diverse software engineering challenges. During my tenure at XYZ company,
      I successfully designed and implemented innovative software solutions to
      optimize operational efficiency. I was particularly impressed by ABC's
      commitment to innovation and its track record of delivering cutting-edge
      solutions. The opportunity to work alongside talented professionals in a
      collaborative and challenging environment greatly appeals to me. With my
      technical expertise, problem-solving abilities, and unwavering passion for
      software engineering, I believe I would make an ideal fit for your
      organization.
      <br />
      <br />
      Thank you for considering my application. I have attached my resume for
      your review, and I am eagerly looking forward to discussing my
      qualifications further. Please feel free to contact me at your
      convenience.
    </>
  );

  return (
    <>
      <Box sx={{ maxWidth: "100%" }}>
        <Box
          sx={{
            width: "612px",
            height: "792px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: mode === "light" ? "#fff" : "#121212",
            border: "1px solid gray",
            padding: {
              xs: "1rem 1.75rem",
              sm: "1.25rem 2rem",
              lg: "1.5rem 2.25rem",
            },
            position: "relative",
          }}
          ref={contentRef}
        >
          <Box
            sx={{
              position: "absolute",
              height: { xs: "5rem", sm: "7.5rem" },
              display: "grid",
              placeItems: "center",
              right: { xs: "3.5rem", sm: "4.5rem" },
              top: "0",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                mt: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              {top_bar.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: ".25rem",
                  }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: { xs: ".4rem", sm: ".65rem" },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ mt: { xs: "1rem", sm: "1.5rem" } }}>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "900",
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              {first_name ? first_name : "David "} <br />{" "}
              {last_name ? last_name : "Rodriguez"}
            </Typography>
            <Divider
              sx={{
                height: { xs: "3.5px", sm: "5px" },
                width: { xs: "27.5%", sm: "25%" },
                backgroundColor: "#4ebab8",
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "700",
                fontSize: { xs: ".5rem", sm: ".8rem" },
              }}
            >
              {job_title ? job_title : "Product Manager"}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { xs: "1rem", sm: "1.5rem" },
              padding: { xs: ".5rem", sm: ".75rem" },
            }}
          >
            <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: ".4rem", sm: ".65rem" },
                }}
              >
                {formattedDate}
              </Typography>
              <Typography
                sx={{
                  mt: { xs: ".75rem", sm: "1.25rem" },
                  fontWeight: "500",
                  fontSize: { xs: ".4rem", sm: ".7rem" },
                }}
              >
                {intro}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: { xs: ".75rem", sm: "1.25rem" },
                overflowWrap: "anywhere",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: ".4rem", sm: ".65rem" },
                  whiteSpace: "pre-line",
                }}
              >
                {body ? body : fake_body}
              </Typography>
              <Typography
                sx={{
                  mt: { xs: "1.25rem", sm: "2rem" },
                  fontWeight: "500",
                  fontSize: { xs: ".4rem", sm: ".7rem" },
                }}
              >
                {closing}
              </Typography>
              <Typography
                sx={{
                  mt: { xs: "1.25rem", sm: "2rem" },
                  fontWeight: "600",
                  fontSize: { xs: ".45rem", sm: ".75rem" },
                }}
              >
                {personal_info
                  ? first_name + " " + last_name
                  : "David Rodriguez"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        sx={{
          width: "100%",
          backgroundColor: "#6505B0",
          color: "white",
          mt: "1.5rem",
          mb: "1.5rem",
        }}
        color="secondary"
        onClick={() =>
          convertToPdf(contentRef.current, first_name + " " + last_name)
        }
      >
        Download PDF
      </Button>
    </>
  );
};

const convertToPdf = async (containerElement: any, name: string) => {
  try {
    html2canvas(containerElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scaleFactor = 1;

      const containerWidth = containerElement.offsetWidth;
      const containerHeight = containerElement.offsetHeight;
      const containerAspectRatio = containerWidth / containerHeight;

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth / containerAspectRatio;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(name ? `${name}.pdf` : "document.pdf");
    });
  } catch (error) {
    console.error("Error converting to PDF:", error);
  }
};

export default CoverLetterTemplateTwo;
