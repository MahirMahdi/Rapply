import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Avatar, Typography, Divider, Button } from "@mui/material";
import arthur from "../../assets/arthur.webp";
import useColorMode from "../../hooks/useColorMode";

const dummy_experience = ["", "", ""];
const dummy_projects = ["", ""];
const dummy_references = ["", ""];
const dummy_achievements = ["", ""];

const ResumeTemplateOne: React.FC<any> = ({
  education,
  skills,
  languages,
  contact,
  experience,
  projects,
  summary,
  achievements,
  references,
  image,
}) => {
  const { mode } = useColorMode();
  const contentRef = useRef(null);

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
            maxWidth: { xs: "612px", sm: "auto" },
            height: "792px",
            display: "flex",
          }}
          ref={contentRef}
        >
          <Box
            sx={{
              width: "30%",
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
              src={image ?? arthur}
              alt="user-image"
              sx={{
                placeSelf: "center",
                width: {
                  xs: "1.5rem",
                  sm: "2.5rem",
                  lg: "4.5rem",
                },
                height: {
                  xs: "1.5rem",
                  sm: "2.5rem",
                  lg: "4.5rem",
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
                    {contact.phone_number.length === 0
                      ? "+0123456789"
                      : contact.phone_number}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={sider_content_sub_header_style}>
                    Email
                  </Typography>
                  <Typography sx={sider_content_info_style}>
                    {contact.email.length === 0
                      ? "dummyuser@email.com"
                      : contact.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={sider_content_sub_header_style}>
                    Address
                  </Typography>
                  <Typography sx={sider_content_info_style}>
                    {contact.location.length === 0
                      ? "1234, Dummy Road, Dummyland."
                      : contact.location}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={sider_content_main_box_style}>
              <Typography sx={sider_content_header_style}>Education</Typography>
              <Divider sx={{ backgroundColor: "white" }} />
              <Box sx={sider_content_sub_box_style}>
                {education.length !== 0 ? (
                  education.map((degree: any, i: number) => (
                    <Box key={i} sx={{ display: "grid", rowGap: ".25rem" }}>
                      <Typography sx={sider_content_sub_header_style}>
                        {degree.degree}
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
                        {degree.school}
                      </Typography>
                      <Typography sx={sider_content_info_style}>
                        {degree.from} - {degree.to}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <>
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
                      <Typography sx={sider_content_info_style}>
                        2008-2012
                      </Typography>
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
                      <Typography sx={sider_content_info_style}>
                        2013-2014
                      </Typography>
                    </Box>
                  </>
                )}
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
                  {skills.length !== 0 ? (
                    skills.map((skill: any, i: number) => (
                      <li key={i}>{skill?.skill}</li>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={sider_content_main_box_style}>
              <Typography sx={sider_content_header_style}>Language</Typography>
              <Divider sx={{ backgroundColor: "white" }} />
              <Box sx={sider_content_sub_box_style}>
                <Box
                  sx={{
                    ...sider_content_info_style,
                    display: "grid",
                    rowGap: { xs: ".15rem", sm: ".25rem" },
                  }}
                >
                  {languages.length !== 0 ? (
                    languages.map((language: any, i: number) => (
                      <li key={i}>{language.language}</li>
                    ))
                  ) : (
                    <>
                      <li>English</li>
                      <li>Spanish</li>
                      <li>French</li>
                      <li>German</li>
                      <li>Russian</li>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "70%",
              height: "792px",
              backgroundColor: mode === "light" ? "#fff" : "#121212",
              paddingLeft: { xs: ".35rem", sm: ".75rem" },
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
                fontSize: { xs: ".6rem", sm: "1rem" },
              }}
            >
              {contact.name.length === 0 ? "Walden Schmidt" : contact.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "400",
                fontSize: { xs: ".45rem", sm: ".75rem" },
              }}
            >
              {contact.job_title.length === 0
                ? "Software Engineer"
                : contact.job_title}
            </Typography>
            <Typography
              sx={{
                mt: { xs: ".3rem", sm: ".5rem" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "300",
                fontSize: { xs: ".3rem", sm: ".45rem" },
              }}
            >
              {summary?.description.length === 0
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc."
                : summary?.description}
            </Typography>
            <Typography
              sx={{
                mt: { xs: ".3rem", sm: ".35rem" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".35rem", sm: ".75rem" },
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
                mt: { xs: ".225rem", sm: ".5rem" },
                display: "grid",
                rowGap: { xs: ".1rem", sm: ".25rem" },
              }}
            >
              {experience.length !== 0
                ? experience.map((ex: any, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        rowGap: { sm: ".35rem" },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                          }}
                        >
                          {ex.position}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {ex.organization}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: { md: "300" },
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          {ex.from} - {ex.to}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: { xs: "500", md: "400" },
                          fontSize: { xs: ".3rem", sm: ".35rem" },
                        }}
                      >
                        {ex.description}
                      </Box>
                    </Box>
                  ))
                : dummy_experience.map((ex, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        rowGap: { sm: ".35rem" },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                          }}
                        >
                          Software Engineer
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
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
                          fontSize: { xs: ".225rem", sm: ".35rem" },
                        }}
                      >
                        {/* max 500 chars*/}
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy.
                      </Box>
                    </Box>
                  ))}
            </Box>
            <Typography
              sx={{
                mt: { xs: ".15rem", sm: ".35rem" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".35rem", sm: ".75rem" },
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
                mt: { xs: ".225rem", sm: ".5rem" },
                display: "grid",
                rowGap: { xs: ".1rem", sm: ".25rem" },
              }}
            >
              {projects.length !== 0
                ? projects.map((project: any, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        rowGap: { sm: ".35rem" },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                            lineHeight: 1,
                          }}
                        >
                          {project.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {project.organization}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "300",
                            fontSize: { xs: ".3rem", sm: ".4rem" },
                          }}
                        >
                          {project.from} - {project.to}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: { xs: "500", md: "400" },
                          fontSize: { xs: ".3rem", sm: ".35rem" },
                        }}
                      >
                        {project.description}
                      </Box>
                    </Box>
                  ))
                : dummy_projects.map((ex, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "grid",
                        rowGap: { sm: ".35rem" },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                            lineHeight: 1,
                          }}
                        >
                          Portfolio Project
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
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
                          fontSize: { xs: ".3rem", sm: ".35rem" },
                        }}
                      >
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy.
                      </Box>
                    </Box>
                  ))}
            </Box>
            <Typography
              sx={{
                mt: { xs: ".225rem", sm: ".5rem" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".35rem", sm: ".75rem" },
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
                mt: { xs: ".225rem", sm: ".5rem" },
                display: "flex",
                columnGap: { xs: "2.5rem", sm: "3.5rem" },
              }}
            >
              {achievements.length !== 0
                ? achievements.map((achievement: any, i: number) => (
                    <Box key={i}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                          }}
                        >
                          {achievement.name}
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
                          {achievement.year} | {achievement.organization}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                : dummy_achievements.map((ex, i) => (
                    <Box key={i}>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
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
                mt: { xs: ".225rem", sm: ".5rem" },
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                fontSize: { xs: ".4rem", sm: ".75rem" },
              }}
            >
              References
            </Typography>
            <Divider
              sx={{
                backgroundColor: mode === "light" ? "#121212" : "#fff",
              }}
            />
            <Box
              sx={{
                mt: { xs: ".225rem", sm: ".5rem" },
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {references.length !== 0
                ? references.map((reference: any, i: number) => (
                    <Box
                      sx={{
                        display: "grid",
                        rowGap: { sm: ".25rem" },
                      }}
                      key={i}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "500",
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                          }}
                        >
                          {reference.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
                          }}
                        >
                          {reference.job_title}, {reference.organization}
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
                            {reference.phone_number}
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
                            {reference.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                : dummy_references.map((ex, i) => (
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
                            fontSize: { xs: ".3rem", sm: ".6rem" },
                          }}
                        >
                          Olivia Parker
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "400",
                            fontSize: { xs: ".3rem", sm: ".5rem" },
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

const sider_content_header_style = {
  color: "white",
  fontSize: {
    xs: ".5rem",
    sm: ".9rem",
  },
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
};

const sider_content_sub_header_style = {
  color: "white",
  fontSize: {
    xs: ".4rem",
    sm: ".75rem",
  },
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "500",
};

const sider_content_info_style = {
  color: "white",
  fontSize: {
    xs: ".3rem",
    sm: ".5rem",
  },
  fontFamily: "'Poppins', sans-serif",
  overflowWrap: "anywhere",
  fontWeight: "300",
};

const sider_content_main_box_style = {
  paddingLeft: {
    xs: ".3rem",
    sm: ".45rem",
  },
  paddingTop: {
    xs: ".35rem",
    sm: ".75rem",
  },
};

const sider_content_sub_box_style = {
  paddingTop: {
    xs: ".3rem",
    sm: ".45rem",
  },
  display: "grid",
  rowGap: {
    xs: ".3rem",
    sm: ".35rem",
  },
};

export default ResumeTemplateOne;
