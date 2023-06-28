import {
  DarkTheme as DefaultDarkTheme,
  LightTheme as DefaultLightTheme,
} from "@refinedev/mui";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    text: {
      primary: "#403f40",
      secondary: "#535253",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "text" && {
            color: "#403f40",
          }),
        }),
      },
    },
  },
});

const DarkTheme = createTheme({
  palette: {
    background: {
      default: "#121212",
      paper: "#323130",
    },
    text: {
      primary: "#fff",
      secondary: "#d9d7d7",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
