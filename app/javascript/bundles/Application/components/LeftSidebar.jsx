import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    marginBottom: 12,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  categories: {
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const CATEGORIES = [
  'new',
  'past',
  'comments',
  'ask',
  'show',
  'jobs',
  'submit',
  'best',
];

export default function LeftSidebar() {
  const classes = useStyles();

  function renderCategories() {
    return CATEGORIES.map((item) => (
      <Chip variant="outlined" size="small" label={item} clickable key={item} />
    ));
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.logo}>
          <Avatar className={classes.orange}>Y</Avatar>
        </div>
        <Typography className={classes.title} gutterBottom>
          Hacker News
        </Typography>
        <Typography color="textSecondary">
          Discover more of what matters to you
        </Typography>
        <div className={classes.categories}>{renderCategories()}</div>
      </CardContent>
    </Card>
  );
}
