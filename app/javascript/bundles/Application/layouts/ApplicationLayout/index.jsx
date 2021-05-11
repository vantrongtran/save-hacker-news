import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import LeftSidebar from '../../components/LeftSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '50px 0',
    [theme.breakpoints.down('xs')]: {
      padding: '20px',
    },
  },
}));

export default function ApplicationLayout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container fixed className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <LeftSidebar />
          </Grid>
          <Grid item md={9} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ApplicationLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
