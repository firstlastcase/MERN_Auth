import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, Fragment } from "react";


// source: "HorizontalLinearStepper" from MUI
export default function AppStepper({
  steps = [
    {
      title: "Step 1",
      content: <div>Step 1 Contents</div>,
      onNextClick: console.log('next'),
      isStepComplete: true,
    }
  ], 
  contentAfterSubmit=<div>complete!</div>,
  onStepperSubmit = ()=>console.log('submitted!')
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  // const [FSContent, setFSContent] = useState('')
  // const [onNextClickFunc ,setOnNextClickFunc] = useState(steps[0].onNextClick);

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(activeStep !== steps.length-1){
      // const proceed = steps[activeStep].onNextClick()
      steps[activeStep].onNextClick&&steps[activeStep].onNextClick()
      // if (proceed) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      
    }
    

    // if(activeStep === steps.length-1){
      else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
     
      // setFSContent(contentAfterSubmit)
      onStepperSubmit()
    // } else {
      // console.log(steps[activeStep])
      // onNextClickFunc()
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>

        {steps.map((step, index) => {
          // step.onNextClick&&setOnNextClickFunc(step.onNextClick)
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            <br />
            {contentAfterSubmit}
            {/* {FSContent} */}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button color="secondary" size="small" onClick={handleReset}>Start over</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          {/* <Box sx={{ mt: 2, mb: 1, display:'flex' }}> */}
          <Box sx={{ mt: 2, mb: 1, display: 'flex',flexDirection:'column'}}>
              <>
                <br />
                {steps[activeStep].content}
              </>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!steps[activeStep].isStepComplete}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
