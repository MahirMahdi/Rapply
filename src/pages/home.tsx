import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { OutlinedButton } from "../components/buttons";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarsIcon from "@mui/icons-material/Stars";
import HelpIcon from "@mui/icons-material/Help";
import Chip from "@mui/material/Chip";
import useColorMode from "../hooks/useColorMode";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import FeatureCard, { FAQCard, TestimonialCard } from "../components/cards";
import IconButton from "@mui/material/IconButton";
import { featuresDetails, testimonials, faqs, footerInfo } from "../data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Logo from "../components/logo";
import FooterInfo from "../components/footer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

type Anchor = "top";

const Home = () => {
  const { mode, setMode } = useColorMode();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("Quick Fill");
  const [navState, setNavState] = useState({
    top: false,
  });

  const paddingX = {
    xs: "1rem",
    sm: "2.5rem",
    md: "3.5rem",
    lg: "5rem",
  };

  const selectCard: React.MouseEventHandler = (e) => {
    const clickedElement = e.target as HTMLElement;
    setSelectedFeature(clickedElement.id);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setNavState({ ...navState, [anchor]: open });
    };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(!entry.isIntersecting);
      },
      { root: null }
    );

    const section = document.getElementById("home");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <Box
          sx={{
            paddingX: paddingX,
          }}
          id="home"
        >
          <nav className="navbar" id="nav">
            <SwipeableDrawer
              anchor={"top"}
              open={navState["top"]}
              onClose={toggleDrawer("top", false)}
              onOpen={toggleDrawer("top", true)}
            >
              <Box sx={{ display: "grid", padding: "1rem", rowGap: ".5rem" }}>
                <Button
                  onClick={() => scrollToSection("#features")}
                  startIcon={<StarsIcon />}
                  sx={{ width: "fit-content" }}
                >
                  Features
                </Button>
                <Button
                  startIcon={<RateReviewIcon />}
                  sx={{ width: "fit-content" }}
                  onClick={() => scrollToSection("#testimonials")}
                >
                  Testimonials
                </Button>
                <Button
                  startIcon={<HelpIcon />}
                  sx={{ width: "fit-content" }}
                  onClick={() => scrollToSection("#faqs")}
                >
                  FAQs
                </Button>
                <Divider
                  sx={{
                    backgroundColor:
                      mode === "dark" ? "rgba(255,255,255,.3)" : "#121212",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                    paddingY: ".5rem",
                  }}
                >
                  <IconButton
                    sx={{
                      width: "fit-content",
                      placeItems: "center",
                      borderRadius: "10px",
                      background:
                        mode === "light"
                          ? "linear-gradient(180deg, rgba(101,5,176,0.33) 0%, rgba(218,0,252,0.37) 100%)"
                          : "linear-gradient(135deg, rgba(101, 5, 176, 0.9) 10%, rgba(212, 0, 248, 0.75) 70%, rgba(214, 0, 250, 0.4) 100%)",
                      color: "white",
                    }}
                    onClick={() => {
                      setMode();
                    }}
                  >
                    {mode === "dark" ? (
                      <LightModeOutlined />
                    ) : (
                      <DarkModeOutlined />
                    )}
                  </IconButton>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif;",
                    }}
                  >
                    v1.0
                  </Typography>
                </Box>
              </Box>
            </SwipeableDrawer>
            <Box
              sx={{
                width: { xs: "50%", md: "25%" },
                display: "flex",
                alignItems: "center",
                columnGap: { xs: "1rem", sm: "1.75rem" },
              }}
            >
              <MenuIcon
                onClick={toggleDrawer("top", true)}
                sx={{
                  display: { md: "none" },
                  fontSize: { xs: "1.75rem", sm: "2.25rem" },
                }}
              />
              <Logo footer={false} login={false} />
            </Box>
            <Box
              sx={{
                width: "50%",
                display: { xs: "none", md: "flex" },
                alignItems: "flex-start",
                justifyContent: "center",
                columnGap: "2rem",
              }}
            >
              <Typography
                onClick={() => scrollToSection("#features")}
                sx={{
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: mode === "light" ? 400 : 300,
                }}
                className="nav-item"
              >
                Features
              </Typography>
              <Typography
                onClick={() => scrollToSection("#testimonials")}
                sx={{
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: mode === "light" ? 400 : 300,
                }}
                className="nav-item"
              >
                Testimonials
              </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: mode === "light" ? 400 : 300,
                }}
                className="nav-item"
                onClick={() => scrollToSection("#faqs")}
              >
                FAQs
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: "50%", md: "25%" },
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                columnGap: "1rem",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  backgroundColor: "#6505b0",
                  placeSelf: "flex-end",
                }}
              >
                Get Started
              </Button>
              <IconButton
                sx={{
                  display: {
                    xs: "none",
                    md: "grid",
                  },
                  placeItems: "center",
                  borderRadius: "10px",
                  background:
                    mode === "light"
                      ? "linear-gradient(180deg, rgba(101,5,176,0.33) 0%, rgba(218,0,252,0.37) 100%)"
                      : "linear-gradient(180deg, rgba(101,5,176,0.45) 0%, rgba(218,0,252,0.55) 100%)",
                  color: "white",
                  placeSelf: "flex-end",
                }}
                onClick={() => {
                  setMode();
                }}
              >
                {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>
            </Box>
          </nav>
        </Box>
      </header>
      <main>
        <Box
          sx={{
            margin: "auto",
            width: { lg: "50%" },
            textAlign: "center",
            marginTop: { xs: "7.5rem", md: "4rem" },
            fontFamily: "'Poppins', sans-serif;",
            display: "grid",
            placeItems: "center",
            rowGap: "1.5rem",
            paddingX: paddingX,
          }}
        >
          <Chip
            label="Rapply is currently in Beta"
            sx={{
              backgroundColor: "#121212",
              color: "white",
              fontFamily: "'Poppins', sans-serif;",
            }}
            id={mode === "dark" ? "chip-gradient" : ""}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                lg: "2.5rem",
              },
              fontWeight: mode === "light" ? 600 : 500,
              fontFamily: "'Poppins', sans-serif;",
            }}
          >
            Supercharge Your Job Search
            <br /> With Our All-In-One <br />
            <span className="text-gradient headline">
              Job Hunting Assistant
            </span>
          </Typography>
          <Typography
            variant="h2"
            color="textSecondary"
            sx={{
              width: { xs: "80%", sm: "60%", md: "50%", lg: "80%" },
              textAlign: "center",
              fontSize: { xs: ".85rem", lg: "1.15rem" },
            }}
          >
            Track applications, generate tailored cover letters, and apply with
            one-click using our powerful chrome extension.
          </Typography>
          <Box
            sx={{
              padding: "2rem 0",
              display: "flex",
              alignItems: "center",
              columnGap: "1.5rem",
            }}
          >
            <Button variant="contained" sx={{ backgroundColor: "#6505b0" }}>
              Try Rapply Demo
            </Button>
            <OutlinedButton
              href="/login"
              name="Watch Video"
              logo={<PlayCircleIcon />}
              placement="right"
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: { xs: "10em", md: "15rem" },
            marginBottom: { md: "3.5rem" },
          }}
          id="features"
        >
          <span className="text-gradient nav-item-header">Features</span>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: { xs: "grid", md: "flex" },
            placeItems: "center",
            justifyContent: "space-between",
            paddingX: paddingX,
          }}
        >
          {featuresDetails.map((feature, i) => {
            const { name, description, logo, lightImage, darkImage } = feature;
            return (
              <Box
                key={i}
                sx={{
                  width: { xs: "100%", md: "33%" },
                  marginY: "2rem",
                  display: "grid",
                  rowGap: "1rem",
                }}
              >
                <FeatureCard
                  name={name}
                  description={description}
                  logo={logo}
                  selectCard={selectCard}
                  selected={selectedFeature === name ? true : false}
                />
                <Box sx={{ display: { md: "none" } }}>
                  <img
                    src={mode === "light" ? lightImage : darkImage}
                    alt={name}
                    width={"100%"}
                    height={"100%"}
                    className="feature-img-sm"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            position: "relative",
            display: { xs: "none", md: "block" },
            paddingTop: "5rem",
            paddingBottom: "10rem",
            paddingX: paddingX,
          }}
          className={
            mode === "light" ? "image-gradient" : "image-gradient-dark"
          }
        >
          {featuresDetails
            .filter((feature) => feature.name === selectedFeature)
            .map((feature, i) => (
              <img
                key={i}
                src={mode === "light" ? feature.lightImage : feature.darkImage}
                alt={feature.name}
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: 10 }}
              />
            ))}
        </Box>
        <Box
          sx={{
            paddingX: paddingX,
            display: "grid",
            rowGap: { xs: "1.5rem", md: "3.5rem" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              marginTop: { xs: "5rem", md: "10rem" },
            }}
            id="testimonials"
          >
            <span className="nav-item-header-normal">Testimonials</span>
          </Box>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={50}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, i) => {
              const { username, review, image } = testimonial;

              return (
                <SwiperSlide key={i}>
                  <TestimonialCard
                    username={username}
                    review={review}
                    image={image}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <Box
          sx={{
            paddingX: paddingX,
            paddingY: "2.5rem",
            marginTop: { xs: "2.5rem", md: "7.5rem" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              marginBottom: { xs: "2.5rem", md: "3.5rem" },
            }}
            id="faqs"
          >
            <span className="text-gradient nav-item-header">FAQs</span>
          </Box>
          <Box sx={{ display: "grid", rowGap: "1rem" }}>
            {faqs.map((faq, i) => (
              <FAQCard key={i} question={faq.question} answer={faq.answer} />
            ))}
          </Box>
        </Box>
        {isButtonVisible && (
          <Box
            sx={{
              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              backgroundColor: "#6505b0",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              color: "white",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(101, 5, 176, 0.9) 10%, rgba(212, 0, 248, 0.75) 70%, rgba(214, 0, 250, 0.4) 100%)",
              },
            }}
            onClick={() => scrollToSection("#nav")}
          >
            <ArrowUpwardIcon />
          </Box>
        )}
      </main>
      <Divider
        sx={{
          marginTop: "3.5rem",
        }}
      />
      <footer
        style={{
          backgroundColor: mode === "dark" ? "rgba(0,0,0,.35)" : "inherit",
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            justifyContent: { sm: "space-between" },
            rowGap: { xs: "2.5rem", md: "0" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              height: "fit-content",
              placeItems: { xs: "center", sm: "inherit" },
            }}
          >
            <Logo footer={true} login={false} />
            <Typography
              sx={{
                marginLeft: ".5rem",
                fontFamily: "'Inter', sans-serif;",
                fontSize: ".85rem",
              }}
            >
              We streamline your job hunt.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: { xs: "100%", sm: "60%" },
            }}
          >
            {footerInfo.map((info, i) => (
              <FooterInfo key={i} header={info.header} data={info.data} />
            ))}
          </Box>
        </Box>
        <Divider
          sx={{
            backgroundColor:
              mode === "dark" ? "rgba(255,255,255,.2)" : "inherit",
            marginTop: "2.5rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            paddingTop: ".75rem",
            alignItems: "center",
            justifyContent: { sm: "space-between" },
            flexDirection: { xs: "column-reverse", sm: "row" },
            rowGap: ".75rem",
          }}
        >
          <Typography
            sx={{
              fontSize: ".75rem",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            ©2023 Rapply. All rights reserved
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "1rem",
            }}
          >
            <TwitterIcon />
            <GitHubIcon />
            <LinkedInIcon />
          </Box>
        </Box>
      </footer>
    </>
  );
};

const scrollToSection = (section: string) => {
  document.querySelector<any>(section).scrollIntoView({
    behavior: "smooth",
  });
};

export default Home;
