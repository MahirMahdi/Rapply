import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const LightTheme = createTheme({
  palette: {
    secondary: { main: "#6505b0" },
    error: { main: "#C21E56" },
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
          ...(ownerState.variant === "contained" && {
            color: "#fff",
          }),
          ":hover": {
            background: "#b334c7",
            color: "white",
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#C9D6DF",
          color: "#323130",
        },
      },
    },
  },
});

const DarkTheme = createTheme({
  palette: {
    secondary: { main: "#6505b0" },
    error: { main: "#C21E56" },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#fff",
      secondary: "#d9d7d7",
    },
    action: {
      disabled: "#919294",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          ":hover": {
            background: "#b334c7",
          },
          ":disabled": {
            backgroundColor: "#000",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0,1)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(173,171,175,0.5)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-track": {
            backgroundColor: "#000",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#52616B",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar-track": {
            background: "#393E46",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#000",
            borderRadius: "20px",
            border: "3px solid #393E46",
          },
        },
      },
    },
  },
});

const DarkThemeWithResponsiveFontSizes = responsiveFontSizes(DarkTheme);
const LightThemeWithResponsiveFontSizes = responsiveFontSizes(LightTheme);

export { LightThemeWithResponsiveFontSizes, DarkThemeWithResponsiveFontSizes };
