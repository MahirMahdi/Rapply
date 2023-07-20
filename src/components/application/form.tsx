import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FileUploadButton } from "../buttons";

const ApplicationForm: React.FC<any> = ({
  open,
  handleClose,
  resume,
  handleResume,
  handleOrganization,
  handleStatus,
  cover,
  handleCover,
  title,
  buttonName,
  handleSubmit,
  handleJobTitle,
  data,
  disabled,
}) => {
  const { organization, status, job_title } = data ?? {};
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "grid", rowGap: "1rem" }}>
        <TextField
          margin="dense"
          label="Company/Organization"
          type="text"
          fullWidth
          variant="standard"
          color="secondary"
          value={organization}
          onChange={(e) => handleOrganization(e)}
        />
        <TextField
          margin="dense"
          label="Job Title"
          type="text"
          fullWidth
          variant="standard"
          color="secondary"
          value={job_title}
          onChange={(e) => handleJobTitle(e)}
        />
        <FormControl color="secondary" variant="standard">
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            fullWidth
            value={status}
            variant="standard"
            color="secondary"
            onChange={(e) => handleStatus(e)}
          >
            <MenuItem value="applied">Applied</MenuItem>
            <MenuItem value="interviewing">Interviewing</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", columnGap: "1.5rem", mt: "1rem" }}>
          <FileUploadButton
            name="Upload Resume"
            file={resume}
            handleFileChange={handleResume}
          />
          <FileUploadButton
            name="Upload Cover"
            file={cover}
            handleFileChange={handleCover}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={disabled} color="secondary" onClick={handleSubmit}>
          {buttonName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmationDialogue: React.FC<any> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete application?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this application?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button sx={{ color: "red" }} onClick={handleDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicationForm;
