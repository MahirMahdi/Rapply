import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import arthur from "../../assets/arthur.webp";
import useColorMode from "../../hooks/useColorMode";

const experience = ["", ""];
const projects = ["", ""];
const references = ["", ""];
const achievements = ["", ""];

const ResumeFormatOne = () => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);

  useEffect(() => {
    console.log(document.body.scrollHeight);
  }, []);
  return (
    <>
      <Box sx={{ maxWidth: "100vw" }}>
        <Box>
          <Box
            sx={{
              maxWidth: "612px",
              height: "792px",
              display: "flex",
            }}
            ref={contentRef}
          >
            <Box
              sx={{
                maxWidth: "35%",
                height: "792px",
                backgroundColor: "#323b4c",
                padding: {
                  xs: ".75rem .5rem",
                  sm: "1.5rem 1rem",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={arthur}
                alt="user-image"
                sx={{
                  placeSelf: "center",
                  width: {
                    xs: "1.5rem",
                    sm: "2.5rem",
                  },
                  height: {
                    xs: "1.5rem",
                    sm: "2.5rem",
                  },
                }}
              />
              <Box sx={sider_content_main_box_style}>
                <Typography sx={sider_content_header_style}>Contact</Typography>
                <Divider sx={{ backgroundColor: "white" }} />
                <Box sx={sider_content_sub_box_style}>
                  <Box>
                    <Typography sx={sider_content_sub_header_style}>
                      Phone
                    </Typography>
                    <Typography sx={sider_content_info_style}>
                      +0123456789
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={sider_content_sub_header_style}>
                      Email
                    </Typography>
                    <Typography sx={sider_content_info_style}>
                      dummyuser@email.com
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={sider_content_sub_header_style}>
                      Address
                    </Typography>
                    <Typography sx={sider_content_info_style}>
                      1234, Dummy Road, Dummyland.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={sider_content_main_box_style}>
                <Typography sx={sider_content_header_style}>
                  Education
                </Typography>
                <Divider sx={{ backgroundColor: "white" }} />
                <Box sx={sider_content_sub_box_style}>
                  <Box sx={{ display: "grid", rowGap: ".25rem" }}>
                    <Typography sx={sider_content_sub_header_style}>
                      Bachelors of Business Administration
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: ".4rem",
                          sm: ".6rem",
                        },
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      Northwest University
                    </Typography>
                    <Typography sx={sider_content_info_style}>2008</Typography>
                  </Box>
                  <Box sx={{ display: "grid", rowGap: ".25rem" }}>
                    <Typography sx={sider_content_sub_header_style}>
                      Masters of Business Administration
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: ".4rem",
                          sm: ".6rem",
                        },
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      Northwest University
                    </Typography>
                    <Typography sx={sider_content_info_style}>2009</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={sider_content_main_box_style}>
                <Typography sx={sider_content_header_style}>Skills</Typography>
                <Divider sx={{ backgroundColor: "white" }} />
                <Box sx={sider_content_sub_box_style}>
                  <Box
                    sx={{
                      ...sider_content_info_style,
                      display: "grid",
                      rowGap: { xs: ".15rem", sm: ".25rem" },
                    }}
                  >
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>React</li>
                    <li>Express</li>
                    <li>Node.js</li>
                    <li>MongoDB</li>
                    <li>Javascript</li>
                    <li>Typescript</li>
                    <li>Next.js</li>
                    <li>Docker</li>
                  </Box>
                </Box>
              </Box>
              <Box sx={sider_content_main_box_style}>
                <Typography sx={sider_content_header_style}>
                  Language
                </Typography>
                <Divider sx={{ backgroundColor: "white" }} />
                <Box sx={sider_content_sub_box_style}>
                  <Box
                    sx={{
                      ...sider_content_info_style,
                      display: "grid",
                      rowGap: { xs: ".15rem", sm: ".25rem" },
                    }}
                  >
                    <li>English</li>
                    <li>Spanish</li>
                    <li>French</li>
                    <li>German</li>
                    <li>Russian</li>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                maxWidth: "65%",
                height: "792px",
                backgroundColor: mode === "light" ? "#fff" : "#121212",
                paddingLeft: { xs: ".45rem", sm: ".75rem" },
                paddingRight: { xs: ".15rem", sm: ".25rem" },
                paddingTop: { xs: ".5rem", sm: "1.5rem" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".75rem", sm: "1rem" },
                }}
              >
                Walden Schlmdit
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "400",
                  fontSize: { xs: ".5rem", sm: ".75rem" },
                }}
              >
                Software Engineer
              </Typography>
              <Typography
                sx={{
                  mt: { xs: ".35rem", sm: ".5rem" },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "300",
                  fontSize: { xs: ".3rem", sm: ".45rem" },
                }}
              >
                {/*max 375 chars*/}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pharetra in lorem at laoreet. Donec hendrerit libero eget est
                tempor, quis tempus arcu elementum. In elementum elit at dui
                tristique feugiat. Mauris convallis, mi at mattis malesuada,
                neque nulla volutpat dolor, hendrerit faucibus eros nibh ut
                nunc.
              </Typography>
              <Typography
                sx={{
                  mt: { xs: ".25rem", sm: ".35rem" },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".5rem", sm: ".75rem" },
                }}
              >
                Experience
              </Typography>
              <Divider
                sx={{
                  backgroundColor: mode === "light" ? "#121212" : "#fff",
                }}
              />
              <Box
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  display: "grid",
                  rowGap: { xs: ".15rem", sm: ".25rem" },
                }}
              >
                {experience.map((ex, i) => (
                  <Box
                    sx={{
                      display: "grid",
                      rowGap: { xs: ".15rem", sm: ".35rem" },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "500",
                          fontSize: { xs: ".4rem", sm: ".6rem" },
                        }}
                      >
                        Software Engineer
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "400",
                          fontSize: { xs: ".35rem", sm: ".5rem" },
                        }}
                      >
                        ABC Company
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: { md: "300" },
                          fontSize: { xs: ".3rem", sm: ".4rem" },
                        }}
                      >
                        2016-2018
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: { xs: "500", md: "400" },
                        fontSize: { xs: ".25rem", sm: ".35rem" },
                        display: "grid",
                        rowGap: { xs: ".1rem", sm: ".2rem" },
                      }}
                    >
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  mt: { xs: ".25rem", sm: ".35rem" },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".5rem", sm: ".75rem" },
                }}
              >
                Projects
              </Typography>
              <Divider
                sx={{
                  backgroundColor: mode === "light" ? "#121212" : "#fff",
                }}
              />
              <Box
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  display: "grid",
                  rowGap: { xs: ".15rem", sm: ".25rem" },
                }}
              >
                {projects.map((ex, i) => (
                  <Box
                    sx={{
                      display: "grid",

                      rowGap: { xs: ".15rem", sm: ".35rem" },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "500",
                          fontSize: { xs: ".4rem", sm: ".6rem" },
                          lineHeight: 1,
                        }}
                      >
                        Portfolio Project
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "400",
                          fontSize: { xs: ".35rem", sm: ".5rem" },
                        }}
                      >
                        Web Developer
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "300",
                          fontSize: { xs: ".3rem", sm: ".4rem" },
                        }}
                      >
                        2016-2018
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: { xs: "500", md: "400" },
                        fontSize: { xs: ".25rem", sm: ".35rem" },
                        display: "grid",
                        rowGap: { xs: ".1rem", sm: ".2rem" },
                      }}
                    >
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                      <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pharetra in lorem at laoreet. Donec hendrerit
                        libero eget est tempor, quis tempus arcu elementum. In
                        elementum elit at dui tristique.
                      </li>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".5rem", sm: ".75rem" },
                }}
              >
                Achievements
              </Typography>
              <Divider
                sx={{
                  backgroundColor: mode === "light" ? "#121212" : "#fff",
                }}
              />
              <Box
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  display: "flex",
                  columnGap: { xs: "2.5rem", sm: "3.5rem" },
                }}
              >
                {achievements.map((ex, i) => (
                  <Box key={i}>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "500",
                          fontSize: { xs: ".4rem", sm: ".6rem" },
                        }}
                      >
                        Best Developer
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "400",
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "400",
                          fontSize: { xs: ".3rem", sm: ".45rem" },
                        }}
                      >
                        2019 | ABCD Inc
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Typography
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  fontSize: { xs: ".5rem", sm: ".75rem" },
                }}
              >
                Reference
              </Typography>
              <Divider
                sx={{
                  backgroundColor: mode === "light" ? "#121212" : "#fff",
                }}
              />
              <Box
                sx={{
                  mt: { xs: ".25rem", sm: ".5rem" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {references.map((ex, i) => (
                  <Box
                    sx={{
                      display: "grid",
                      rowGap: { xs: ".1rem", sm: ".25rem" },
                    }}
                    key={i}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "500",
                          fontSize: { xs: ".4rem", sm: ".6rem" },
                        }}
                      >
                        Olivia Parker
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "400",
                          fontSize: { xs: ".35rem", sm: ".5rem" },
                        }}
                      >
                        Software Engineer, ABC Company
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: { xs: ".1rem", sm: ".25rem" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          Phone
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          +2232132323
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: {
                            xs: ".1rem",
                            sm: ".25rem",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          Email
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          olivia@email.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
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

const sider_content_header_style = {
  color: "white",
  fontSize: {
    xs: ".6rem",
    sm: ".9rem",
  },
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
};

const sider_content_sub_header_style = {
  color: "white",
  fontSize: {
    xs: ".5rem",
    sm: ".75rem",
  },
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "500",
};

const sider_content_info_style = {
  color: "white",
  fontSize: {
    xs: ".35rem",
    sm: ".5rem",
  },
  fontFamily: "'Poppins', sans-serif",
  overflowWrap: "anywhere",
  fontWeight: "300",
};

const sider_content_main_box_style = {
  paddingLeft: {
    xs: ".25rem",
    sm: ".45rem",
  },
  paddingTop: {
    xs: ".5rem",
    sm: ".75rem",
  },
};

const sider_content_sub_box_style = {
  paddingTop: {
    xs: ".25rem",
    sm: ".45rem",
  },
  display: "grid",
  rowGap: {
    xs: ".25rem",
    sm: ".35rem",
  },
};

export default ResumeFormatOne;
