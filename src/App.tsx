import { useEffect } from "react";
import { Refine, Authenticated } from "@refinedev/core";
import "./App.css";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { appwriteClient } from "./utility";
import "@fontsource-variable/lexend";
import "@fontsource/poppins";
import "swiper/css";
import "swiper/css/pagination";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/800.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import Home from "./pages/home";
import OAuthRedirect from "./components/auth/oauthRedirect";
import CompleteProfileInfo from "./pages/profile/complete-profile";
import SignupSuccess from "./pages/success/signup";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import RecoveryEmailSuccess from "./pages/success/recovery-email";
import PasswordRecovered from "./pages/success/password-recovered";
import ResetPassword from "./pages/auth/reset-password";
import VerifyUser from "./components/auth/verifyUser";
import ProfileCompleted from "./pages/success/profile-completed";
import { Title } from "./components/title";
import Profile from "./pages/profile/profile";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import { ThemedSiderV2 } from "./components/themedLayout/sider";
import CoverLetter from "./pages/cover-letter/cover-letter";
import ResumeBuilder from "./pages/resume/resume-builder";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import ApplicationTracker from "./pages/application-tracker/application-tracker";
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);

    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: window.location.pathname,
    });
  }, []);
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
            })}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "profile",
                list: "/profile",
                icon: <PersonIcon />,
                options: {
                  label: "My Profile",
                },
              },
              {
                name: "generate",
                list: "/generate-cover-letter",
                icon: <DescriptionIcon />,
                options: {
                  label: "Cover Letter",
                },
              },
              {
                name: "track",
                list: "/application-tracker",
                icon: <TimelineIcon />,
                options: {
                  label: "Application Tracker",
                },
              },
              {
                name: "build",
                list: "/resume-builder",
                icon: <DocumentScannerIcon />,
                options: {
                  label: "Resume Builder",
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route index element={<Home />} />
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route path="/verify-email" element={<SignupSuccess />} />
                <Route path="/oauth/redirect" element={<OAuthRedirect />} />
                <Route
                  path="/complete/profile"
                  element={<CompleteProfileInfo />}
                />
                <Route
                  path="/profile-completed"
                  element={<ProfileCompleted />}
                />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2
                      Sider={ThemedSiderV2}
                      Title={({ collapsed }) => <Title collapsed={collapsed} />}
                      Header={() => <Header sticky />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="profile">
                  <Route index element={<Profile />} />
                </Route>
                <Route
                  path="/generate-cover-letter"
                  element={<CoverLetter />}
                />
                <Route
                  path="/application-tracker"
                  element={<ApplicationTracker />}
                />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <VerifyUser>
                      <NavigateToResource resource="profile" />
                    </VerifyUser>
                  </Authenticated>
                }
              >
                <Route
                  path="/recovery-email-sent/:email"
                  element={<RecoveryEmailSuccess />}
                />
                <Route
                  path="/password-recovered"
                  element={<PasswordRecovered />}
                />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
