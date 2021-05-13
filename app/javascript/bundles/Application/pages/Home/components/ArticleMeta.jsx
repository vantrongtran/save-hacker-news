import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
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

export default function ArticleMeta({ article }) {
  const classes = useStyles();
  const {
    author, published_time, point, comment_count,
  } = article;

  return (
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
  );
}

ArticleMeta.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
