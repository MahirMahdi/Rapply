import { Refine, Authenticated } from "@refinedev/core";
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
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { appwriteClient } from "./utility";
import "@fontsource-variable/lexend";
import "@fontsource/poppins";
import "swiper/css";
import "swiper/css/pagination";
import "./App.css";
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
import Dashboard from "./pages/dashboard";
import OAuthRedirect from "./components/auth/oauthRedirect";
import UserInfo from "./pages/user-info";
import SignupSuccess from "./pages/success/signup";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import RecoveryEmailSuccess from "./pages/success/recovery-email";
import PasswordRecovered from "./pages/success/password-recovered";
import ResetPassword from "./pages/auth/reset-password";
import VerifyUser from "./components/auth/verifyUser";

function App() {
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(appwriteClient, {
              databaseId: "database",
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "database",
            })}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
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
                <Route path="/complete/user-info" element={<UserInfo />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2 Header={() => <Header sticky />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="dashboard">
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <VerifyUser>
                      <NavigateToResource resource="dashboard" />
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
