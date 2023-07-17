import {
  Box,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { FcDepartment, FcDiploma2, FcDocument } from "react-icons/fc";
import useColorMode from "../../hooks/useColorMode";
import React from "react";

const colors: any = {
  applied: "secondary",
  interviewing: "primary",
  accepted: "success",
  rejected: "error",
};

const ApplicationCard: React.FC<any> = ({ data, handleDelete, handleEdit }) => {
  const { mode } = useColorMode();
  const { organization, resume_url, cover_url, job_title, status } = data;
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "45%", lg: "30%" },
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "grid", rowGap: "2rem" }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif;",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FcDepartment /> {organization}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontFamily: "'Inter', sans-serif;",
                fontSize: ".85rem",
              }}
            >
              {job_title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              fontFamily: "'Inter', sans-serif;",
              fontSize: ".9rem",
              fontWeight: "500",
              rowGap: ".5rem",
            }}
          >
            <Link
              href={resume_url ?? "#"}
              target={resume_url && "_blank"}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: ".25rem",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  color: "#6505B0",
                },
              }}
            >
              <FcDiploma2 />
              Resume
            </Link>

            <Link
              href={cover_url ?? "#"}
              target={cover_url && "_blank"}
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: ".25rem",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  color: "#6505B0",
                },
              }}
            >
              <FcDocument />
              Cover
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Chip
            variant="outlined"
            color={colors[status]}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            sx={{ fontFamily: "'Inter', sans-serif;" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              //   columnGap: ".5rem",
            }}
          >
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <EditIcon
                  sx={{ color: mode === "light" ? "#323130" : "#9BA4B4" }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
