import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    marginBottom: 15,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 300,
    height: 200,
  },
  articleMeta: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  metaGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  metaItem: {
    display: 'flex',
    margin: theme.spacing(2),
    alignItems: 'center',
  },
  avatar: {
    width: 25,
    height: 25,
    fontSize: 20,
    marginRight: 5,
  },
}));

export default function Article({ article, loading }) {
  const classes = useStyles();

  if (loading) {
    return (
      <Card className={classes.root}>
        <Skeleton animation="wave" variant="rect" className={classes.cover} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Skeleton width="100%">
              <Typography>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
                suscipit sequi numquam?
              </Typography>
            </Skeleton>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </CardContent>
        </div>
      </Card>
    );
  }
  const {
    title, point, comment_count, author, published_time,
  } = article;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
        title={title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <div className={classes.articleMeta}>
            <div className={classes.metaGroup}>
              <div className={classes.metaItem}>
                <Avatar className={classes.avatar}>{author.charAt(0)}</Avatar>
                <Typography variant="subtitle1" color="textSecondary">
                  {author}
                </Typography>
              </div>
              <Typography variant="subtitle1" color="textSecondary">
                {published_time}
              </Typography>
            </div>
            <div className={classes.metaGroup}>
              <div className={classes.metaItem}>
                <Typography variant="subtitle1" color="textSecondary">
                  {point}
                </Typography>
                <FavoriteBorderIcon fontSize="small" />
              </div>
              <div className={classes.metaItem}>
                <Typography variant="subtitle1" color="textSecondary">
                  {comment_count}
                </Typography>
                <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

Article.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
};
