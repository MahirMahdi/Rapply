import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useEffect, useState } from "react";
import useColorMode from "../../hooks/useColorMode";
import { User } from "../../interfaces";
import { storage, database } from "../../utility";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useColorMode();
  const [photo, setPhoto] = useState("");
  const { data: user } = useGetIdentity<User>();
  const [username, setUsername] = useState("");

  const getUserPhoto = async () => {
    try {
      const response = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        user?.prefs.photoId ?? ""
      );

      setPhoto(response.href);
    } catch (error) {
      return error;
    }
  };

  const getPersonalInformation = async () => {
    if (user) {
      try {
        const response = await database.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PERSONAL_INFO_COLLECTION_ID,
          user.$id
        );

        const { first_name, last_name, ...rest } = response;
        setUsername(first_name + " " + last_name);
      } catch (error) {
        return error;
      }
    }
  };

  useEffect(() => {
    getUserPhoto();
    getPersonalInformation();
  }, [user]);

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(photo || user?.name) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline-block",
                    },
                  }}
                  variant="subtitle2"
                >
                  {username}
                </Typography>
                <Avatar
                  src={photo}
                  alt={username}
                  sx={{
                    bgcolor: mode === "light" ? "#9BA4B4" : "#6505b0",
                    color: "#fff",
                  }}
                >
                  {username.slice(0, 1)}
                </Avatar>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
