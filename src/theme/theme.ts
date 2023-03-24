import { createMuiTheme } from "@material-ui/core";

export const colors = {
  primary: '#1a1f32',
  dark: "#000",
  white: '#fff'
}
const theme = createMuiTheme({
  palette: {
    common: {
      black: colors.dark,
      white: colors.white,
    },
    primary: {
      main: colors.primary,
     
    },
   
  },
  typography: {
    fontSize: 14,
    allVariants:{
      color: colors.dark,
    },
    h1: {
      fontSize: 24,
    },
  },
});

export default theme;
