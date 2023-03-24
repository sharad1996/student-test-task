import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    radio: {
      '&$checked': {
        color: 'green'
      }
    },
    student: {
      color: 'red'
    },
    dialogWrapper: {
      minWidth: 200,
      minHeight: 200,
      padding: 20,
    },
    sorting: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor:' pointer',
    },
    sortingImg: {
      width: 10
    },
    searchInput: {
      color: 'red',
      padding: 20,
    },
    inputField: { 
      textAlign: 'center',
      color: '#000 !important',
      borderRadius: 100,
      background: '#fff',
    }
  })
);
