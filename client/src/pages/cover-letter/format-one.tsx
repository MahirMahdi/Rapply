import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const intro = [
  {
    icon: <EmailIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "dummyuser@email.com",
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "in/dummyuser",
  },
  {
    icon: <LanguageIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "www.dummyuser.com",
  },
  {
    icon: <SmartphoneIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "+3243123213",
  },
];

const CoverLetterFormatOne = () => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);

  return (
    <>
      <Box sx={{ maxWidth: "100vw" }}>
        <Box
          sx={{
            maxWidth: "612px",
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
              width: { xs: "1.5rem", sm: "2rem" },
              height: { xs: "3rem", sm: "5rem" },
              backgroundColor: mode === "light" ? "#121212" : "#fff",
              right: { xs: "4.5rem", sm: "6rem" },
              top: "0",
            }}
          ></Box>
          <Box sx={{ mt: { xs: "1rem", sm: "1.5rem" } }}>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: "900",
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              Ella <br /> Mitchell
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            {intro.map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
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
          <Divider
            sx={{
              height: { xs: "2px", sm: "2.5px" },
              backgroundColor: mode === "light" ? "#121212" : "#fff",
            }}
          />
          <Box sx={{ padding: { xs: ".5rem", sm: ".75rem" } }}>
            <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: ".4rem", sm: ".65rem" },
                }}
              >
                27 June 2023
              </Typography>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: ".6rem", sm: ".9rem" },
                }}
              >
                Amelia Lee
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: ".45rem", sm: ".7rem" },
                }}
              >
                ABC Company Ltd <br />
                1234 Any street, Any city.
              </Typography>
              <Typography
                sx={{
                  mt: { xs: ".75rem", sm: "1.25rem" },
                  fontWeight: "500",
                  fontSize: { xs: ".4rem", sm: ".7rem" },
                }}
              >
                Dear Ms. Amelia,
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
                }}
              >
                I am writing to express my interest in the software engineer
                position at ABC company. With 5 years of experience and
                expertise in software development, I am confident that I would
                be a valuable addition to your team. <br />
                <br />
                My strong coding skills, collaborative nature, and proficiency
                in various programming languages and technologies enable me to
                effectively tackle diverse software engineering challenges.
                During my tenure at XYZ company, I successfully designed and
                implemented innovative software solutions to optimize
                operational efficiency. I was particularly impressed by ABC's
                commitment to innovation and its track record of delivering
                cutting-edge solutions. The opportunity to work alongside
                talented professionals in a collaborative and challenging
                environment greatly appeals to me. With my technical expertise,
                problem-solving abilities, and unwavering passion for software
                engineering, I believe I would make an ideal fit for your
                organization.
                <br />
                <br />
                Thank you for considering my application. I have attached my
                resume for your review, and I am eagerly looking forward to
                discussing my qualifications further. Please feel free to
                contact me at your convenience.
              </Typography>
              <Typography
                sx={{
                  mt: { xs: "1.25rem", sm: "2rem" },
                  fontWeight: "500",
                  fontSize: { xs: ".4rem", sm: ".7rem" },
                }}
              >
                Best Regards
              </Typography>
              <Typography
                sx={{
                  mt: { xs: "1.25rem", sm: "2rem" },
                  fontWeight: "600",
                  fontSize: { xs: ".45rem", sm: ".75rem" },
                }}
              >
                Ella Mitchell
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <button onClick={() => convertToPdf(contentRef.current)}>
        Generate PDF
      </button>
    </>
  );
};

const convertToPdf = async (containerElement: any) => {
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
      pdf.save("document.pdf");
    });
  } catch (error) {
    console.error("Error converting to PDF:", error);
  }
};

export default CoverLetterFormatOne;
