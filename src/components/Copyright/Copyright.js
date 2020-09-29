import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 40,
  },
}));

function Copyright() {
  const classes = useStyles();
    return (
      <div className={classes.root}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Care Amarillo
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </div>
    );
}
export default Copyright;
