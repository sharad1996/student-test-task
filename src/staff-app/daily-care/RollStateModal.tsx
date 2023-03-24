import { Box, Button, Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { useState } from "react";
import useStyles from './Style';

interface IProps{
  open: boolean;
  onSubmit: (value: string) => void;
  defaultValue: string;
}
function RollStateModel({ open, onSubmit, defaultValue }: IProps) {
  const style: any = useStyles();
  const [studentState, setStudentState] = useState(defaultValue); 
  const onHandleChange = (value: string) => {
    if (value) {
      setStudentState(value)
    }
  }

  const onHandleSubmit = () => {
    if (studentState) {
      onSubmit(studentState);
    }
  }

  return (
    <Dialog open={open} maxWidth="lg">
      <Box sx={{ minWidth: 200}} className={style.dialogWrapper}>
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
              defaultValue={defaultValue}
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
        <Button color="primary" onClick={onHandleSubmit} variant="contained" fullWidth={true}>submit</Button>
      </Box>
    </Dialog>
   );
}

export default RollStateModel;