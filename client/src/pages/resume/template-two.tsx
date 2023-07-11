import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const intro = [
  {
    icon: <LocationOnIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "Tokyo, Japan",
  },
  {
    icon: <EmailIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "dummyuser@email.com",
  },
  {
    icon: <SmartphoneIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "+3243123213",
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: { xs: ".4rem", sm: ".65rem" } }} />,
    label: "in/dummyuser",
  },
];
const experience = ["", ""];
const projects = ["", ""];
const references = ["", ""];
const achievements = ["", ""];

const ResumeTemplateTwo = () => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);

  //   useEffect(() => {
  //     console.log(document.body.scrollHeight);
  //   }, []);
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
              Isabella Davis
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
              {/*max 375 chars*/}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pharetra in lorem at laoreet. Donec hendrerit libero eget est
              tempor, quis tempus arcu elementum. In elementum elit at dui
              tristique feugiat. Mauris convallis, mi at mattis malesuada, neque
              nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc.
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
            {experience.map((item, i) => (
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
                        fontSize: { xs: ".4rem", sm: ".6rem" },
                      }}
                    >
                      Marketing Director
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "600",
                        fontSize: { xs: ".35rem", sm: ".5rem" },
                      }}
                    >
                      ABC Company
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: "600",
                      fontSize: { xs: ".35rem", sm: ".5rem" },
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
                    fontSize: { xs: ".3rem", sm: ".45rem" },
                  }}
                >
                  {/* max 200 chars*/}
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
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
            {projects.map((item, i) => (
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
                        fontSize: { xs: ".4rem", sm: ".6rem" },
                      }}
                    >
                      Portfolio Project
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "600",
                        fontSize: { xs: ".35rem", sm: ".5rem" },
                      }}
                    >
                      Marketing Analyst
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: "600",
                      fontSize: { xs: ".35rem", sm: ".5rem" },
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
                    fontSize: { xs: ".3rem", sm: ".45rem" },
                  }}
                >
                  {/* max 200 chars*/}
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pharetra in lorem at laoreet. Donec hendrerit libero
                    eget est tempor, quis tempus arcu elementum. In elementum
                    elit at dui tristique.
                  </li>
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
            {references.map((item, i) => (
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
                        fontSize: { xs: ".4rem", sm: ".6rem" },
                      }}
                    >
                      Bachelor of Business Administration (BBA) in Marketing
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Source Sans Pro', sans-serif",
                        fontWeight: "600",
                        fontSize: { xs: ".35rem", sm: ".5rem" },
                      }}
                    >
                      Northwest University
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Source Sans Pro', sans-serif",
                      fontWeight: "600",
                      fontSize: { xs: ".35rem", sm: ".5rem" },
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
              mt: { xs: ".25rem", sm: ".35rem" },
              backgroundColor: "rgba(255,255,255,.75)",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: "max-content",
              mt: { xs: ".25rem", sm: ".35rem" },
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
            <Box sx={{ mt: { xs: ".25rem", sm: ".35rem" } }}>
              <Typography
                sx={{
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".3rem", sm: ".5rem" },
                }}
              >
                Digital Marketing, Market Research, SEO, Email Marketing,
                Strategic Planning, Marketing Automation, Brand Strategy and
                Positioning, Marketing Campaign Management, Social Media
                Marketing, Content Creation and Copywriting
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

export default ResumeTemplateTwo;
