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
import { storage } from "../../utility";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useColorMode();
  const [photo, setPhoto] = useState("");
  const { data: user } = useGetIdentity<User>();

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

  useEffect(() => {
    getUserPhoto();
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
                {user?.name && (
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-block",
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.name}
                  </Typography>
                )}
                <Avatar
                  src={photo}
                  alt={user?.name}
                  sx={{
                    bgcolor: mode === "light" ? "#9BA4B4" : "#6505b0",
                    color: "#fff",
                  }}
                >
                  {user?.name.slice(0, 1)}
                </Avatar>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
