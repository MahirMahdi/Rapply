import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const steps = ["", "", ""];

const ProgressStepper: React.FC<any> = ({
  handleNextStep,
  handleStepBack,
  handleSkipStep,
  handleSubmit,
  activeStep,
  skipped,
  disableCondition,
}) => {
  const isStepOptional = (step: number) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  return (
    <Box sx={{ maxWidth: "100%", mt: "2.5rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              sx={{
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#6505B0",
                },
                "& .MuiStepIcon-root": {
                  color: "#919294",
                },
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#6505B0",
                },
              }}
              key={index}
              {...stepProps}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="contained"
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => handleStepBack()}
            sx={{ mr: 1, backgroundColor: "#6505B0" }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {isStepOptional(activeStep) && (
            <Button
              variant="contained"
              color="inherit"
              onClick={() =>
                activeStep === steps.length - 1
                  ? handleSubmit()
                  : handleSkipStep()
              }
              sx={{
                mr: 1,
                backgroundColor: "#6505B0",
              }}
            >
              Skip
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6505B0" }}
            disabled={disableCondition}
            onClick={() =>
              activeStep === steps.length - 1
                ? handleSubmit()
                : handleNextStep()
            }
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default ProgressStepper;
