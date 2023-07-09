import React from "react";
import { Link } from "react-router-dom";
import useColorMode from "../../hooks/useColorMode";
import { OutlinedButtonProps } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloudUpload from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  logo,
  href,
  name,
  placement,
}) => {
  const { mode } = useColorMode();
  return (
    <Link
      to={href}
      style={{
        placeSelf: placement === "right" ? "flex-end" : "flex-start",
        textDecoration: "none",
      }}
    >
      <button
        className="outlined-button"
        id={mode === "dark" ? "outlined-button-dark" : ""}
      >
        {logo}
        {name}
      </button>
    </Link>
  );
};

export const EditButton: React.FC<any> = ({ handleClick }) => {
  const { mode } = useColorMode();
  return (
    <Button
      size="small"
      sx={{
        borderRadius: "1.15rem",
        placeSelf: "flex-end",
        color: mode === "light" ? "#6505B0" : "inherit",
        borderColor: mode === "light" ? "#6505B0" : "inherit",
        padding: { xs: "0", sm: ".25rem .75rem" },
        mt: { xs: "1.5rem", sm: 0 },
        "&:hover": {
          backgroundColor: "#6505B0",
          borderColor: "#6505B0",
        },
        width: "fit-content",
      }}
      startIcon={<EditIcon />}
      variant="outlined"
      onClick={handleClick}
    >
      Edit
    </Button>
  );
};

export const FileUploadButton: React.FC<any> = ({
  handleFileChange,
  file,
  name,
  type,
}) => {
  return (
    <label htmlFor="file-input">
      <input
        type="file"
        accept={
          name !== "Upload Resume" || name !== "Resume"
            ? ".jpg,.jpeg,.png,.gif"
            : "*"
        }
        id="file-input"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e)}
      />
      <Button
        sx={{ backgroundColor: "#6505B0" }}
        variant="contained"
        component="span"
        startIcon={
          !file ? (
            <CloudUpload />
          ) : name === "Upload Resume" || name === "Resume" ? (
            <DocumentScannerIcon />
          ) : (
            <ImageIcon />
          )
        }
      >
        {file ? `${file.name}` : name}
      </Button>
    </label>
  );
};

export const SaveButton: React.FC<any> = ({
  disableCondition,
  handleClick,
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: "1.15rem",
        placeSelf: "flex-end",
        backgroundColor: "#6505B0",
        padding: { xs: "0", sm: ".25rem .75rem" },
        mt: { xs: "1.5rem", sm: 0 },
        width: "fit-content",
      }}
      disabled={disableCondition}
      onClick={handleClick}
    >
      Save
    </Button>
  );
};

export const CloseButton: React.FC<any> = ({ handleClick }) => {
  return (
    <IconButton
      sx={{ position: "absolute", right: "1.25rem", top: ".5rem" }}
      onClick={() => handleClick()}
    >
      <CloseIcon sx={{ fontSize: { xs: "1.15rem", sm: "1.5rem" } }} />
    </IconButton>
  );
};
