import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Typography, Divider, Button } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const dummy_experience = ["", "", ""];
const dummy_projects = ["", ""];
const dummy_education = ["", ""];

const ResumeTemplateTwo: React.FC<any> = ({
  education,
  skills,
  contact,
  experience,
  projects,
  summary,
}) => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);

  const intro = [
    {
      icon: <LocationOnIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: contact.location.length === 0 ? "Tokyo, Japan" : contact.location,
    },
    {
      icon: <EmailIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: contact.email.length === 0 ? "dummyuser@email.com" : contact.email,
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label:
        contact.phone_number.length === 0
          ? "+3243123213"
          : contact.phone_number,
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
      label: contact.linkedin.length === 0 ? "in/dummyuser" : contact.linkedin,
    },
  ];

  return (
    <>
      <Box sx={{ maxWidth: "100vw" }}>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "#6505B0",
            color: "white",
            mt: "1.5rem",
            mb: "1.5rem",
          }}
          color="secondary"
          onClick={() => convertToPdf(contentRef.current, contact.name)}
        >
          Download PDF
        </Button>
        <Box
          sx={{
            maxWidth: "612px",
            height: "792px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: mode === "light" ? "#fff" : "#121212",
            padding: { xs: ".75rem", sm: "1rem", lg: "1.5rem" },
          }}
          ref={contentRef}
        >
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".75rem", sm: "1rem" },
                placeSelf: "center",
              }}
            >
              {contact.name.length === 0 ? "Isabella Davis" : contact.name}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                columnGap: { xs: ".25rem", sm: ".5rem" },
              }}
            >
              {intro.map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <Typography
                    sx={{
                      fontFamily: "'Source Sans Pro', sans-serif",
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
                mt: ".15rem",
                backgroundColor: "rgba(255,255,255,.75)",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".1rem", sm: ".35rem" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".45rem", sm: ".75rem" },
              }}
            >
              Summary
            </Typography>
            <Divider
              sx={{
                height: { xs: "2px", sm: "2.5px" },
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            <Typography
              sx={{
                mt: { xs: ".1rem", sm: ".5rem" },
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "300",
                fontSize: { xs: ".3rem", sm: ".45rem" },
              }}
            >
              {summary?.description.length === 0
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc."
                : summary?.description}
            </Typography>
          </Box>
          <Divider
            sx={{
              mt: { xs: ".1rem", sm: ".35rem" },
              backgroundColor: "rgba(255,255,255,.75)",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".1rem", sm: ".35rem" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".45rem", sm: ".75rem" },
              }}
            >
              Experience
            </Typography>
            <Divider
              sx={{
                height: { xs: "2px", sm: "2.5px" },
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            {experience.length !== 0
              ? experience.map((ex: any, i: number) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          {ex.position}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {ex.organization}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                        }}
                      >
                        {ex.from} - {ex.to}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: { xs: ".1rem", sm: ".35rem" },
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "300",
                        fontSize: { xs: ".25rem", sm: ".45rem" },
                      }}
                    >
                      {ex.description}
                    </Box>
                  </Box>
                ))
              : dummy_experience.map((item, i) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          Marketing Director
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          ABC Company
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                        }}
                      >
                        2016-2019
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: { xs: ".1rem", sm: ".35rem" },
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "300",
                        fontSize: { xs: ".25rem", sm: ".45rem" },
                      }}
                    >
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy.
                    </Box>
                  </Box>
                ))}
          </Box>
          <Divider
            sx={{
              mt: { xs: ".1rem", sm: ".35rem" },
              backgroundColor: "rgba(255,255,255,.75)",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".1rem", sm: ".35rem" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".45rem", sm: ".75rem" },
              }}
            >
              Projects
            </Typography>
            <Divider
              sx={{
                height: { xs: "2px", sm: "2.5px" },
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            {projects.length !== 0
              ? projects.map((project: any, i: number) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          {project.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {project.organization}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                        }}
                      >
                        {project.from} - {project.to}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: { xs: ".25rem", sm: ".35rem" },
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "300",
                        fontSize: { xs: ".25rem", sm: ".45rem" },
                      }}
                    >
                      {project.description}
                    </Box>
                  </Box>
                ))
              : dummy_projects.map((item, i) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          Portfolio Project
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          Marketing Analyst
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                        }}
                      >
                        2016-2019
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: { xs: ".25rem", sm: ".35rem" },
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "300",
                        fontSize: { xs: ".25rem", sm: ".45rem" },
                      }}
                    >
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy.
                    </Box>
                  </Box>
                ))}
          </Box>
          <Divider
            sx={{
              mt: { xs: ".1rem", sm: ".35rem" },
              backgroundColor: "rgba(255,255,255,.75)",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".1rem", sm: ".35rem" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".45rem", sm: ".75rem" },
              }}
            >
              Education
            </Typography>
            <Divider
              sx={{
                height: { xs: "2px", sm: "2.5px" },
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            {education.length !== 0
              ? education.map((degree: any, i: number) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          {degree.degree}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {degree.school}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                          placeSelf: "center",
                        }}
                      >
                        {degree.from} - {degree.to}
                      </Typography>
                    </Box>
                  </Box>
                ))
              : dummy_education.map((item, i) => (
                  <Box key={i} sx={{ mt: { xs: ".1rem", sm: ".35rem" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "700",
                            fontSize: { xs: ".35rem", sm: ".6rem" },
                          }}
                        >
                          Bachelor of Business Administration (BBA) in Marketing
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Source Sans Pro', sans-serif",
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          Northwest University
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "'Source Sans Pro', sans-serif",
                          fontWeight: "600",
                          fontSize: { xs: ".25rem", sm: ".5rem" },
                          placeSelf: "center",
                        }}
                      >
                        2016-2019
                      </Typography>
                    </Box>
                  </Box>
                ))}
          </Box>
          <Divider
            sx={{
              mt: { xs: ".1rem", sm: ".35rem" },
              backgroundColor: "rgba(255,255,255,.75)",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".1rem", sm: ".35rem" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".45rem", sm: ".75rem" },
                placeSelf: "center",
              }}
            >
              Skills
            </Typography>
            <Divider
              sx={{
                height: { xs: "2px", sm: "2.5px" },
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            <Box
              sx={{
                mt: { xs: ".1rem", sm: ".35rem" },
                display: "flex",
                alignItems: "center",
              }}
            >
              {skills !== 0 ? (
                <Typography
                  sx={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "600",
                    fontSize: { xs: ".25rem", sm: ".5rem" },
                  }}
                >
                  {skills.map((skill: any, i: number) => {
                    if (i === skills.length - 1) {
                      return skill.skill;
                    } else {
                      return `${skill.skill}, `;
                    }
                  })}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "600",
                    fontSize: { xs: ".25rem", sm: ".5rem" },
                  }}
                >
                  Digital Marketing, Market Research, SEO, Email Marketing,
                  Strategic Planning, Marketing Automation, Brand Strategy and
                  Positioning, Marketing Campaign Management, Social Media
                  Marketing, Content Creation and Copywriting
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
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
      pdf.save(`${name}.pdf`);
    });
  } catch (error) {
    console.error("Error converting to PDF:", error);
  }
};

export default ResumeTemplateTwo;
