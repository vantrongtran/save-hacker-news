import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Container fixed>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h3" className={classes.title}>
            Save Hacker News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
