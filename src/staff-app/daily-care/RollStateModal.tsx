import { Box, Button, Dialog, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { useState } from "react";
import "./roll-state.css";

interface IProps{
  open: boolean;
  onSubmit: (value: string) => void;
}
function RollStateModel({ open, onSubmit }: IProps) {
  const [studentState, setStudentState] = useState(""); 
  
  const onHandleChange = (value: string) => {
    if (value) {
      setStudentState(value)
    }
  }

  const onHandleSubmit = () => {
    if (studentState) {
      // close the Modal & set the state of student
      onSubmit(studentState);
    }
  }

  return (
    <Dialog open={open} maxWidth="lg">
      <Box sx={{ minWidth: 200}} className="dialog-wrapper">
        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <Typography
                  component="div"
                  variant="h1"
                >
                  Student Status
                </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={(e) => {
                onHandleChange(e.target.value)
              }}
            >
              <FormControlLabel value="present" control={<Radio />} label="Present" />
              <FormControlLabel value="late" control={<Radio />} label="Late" />
              <FormControlLabel value="absent" control={<Radio />} label="Absent" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button  onClick={onHandleSubmit} variant="contained" fullWidth={true}>submit</Button>
      </Box>
    </Dialog>
   );
}

export default RollStateModel;