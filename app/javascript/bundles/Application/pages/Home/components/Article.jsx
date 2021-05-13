import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

import ArticleMeta from './ArticleMeta';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
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
  articleMetaLoading: {
    marginBottom: 50,
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
  excerpt: {
    height: '4rem',
    overflow: 'hidden',
  },
}));

export default function Article({
  article = {},
  loading = false,
  setSelectedAricle,
}) {
  const classes = useStyles();
  const [contentLoading, setContentLoading] = useState(true);
  const [articleContent, setArticleContent] = useState({});

  function getArticleContent() {
    fetch(`/api/v1/article?url=${article.page_src}`)
      .then((response) => response.json())
      .then((data) => {
        setArticleContent(data);
        setContentLoading(false);
      });
  }

  useEffect(() => {
    if (Object.keys(article).length > 0) getArticleContent();
  }, [article]);

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
            <div className={classes.articleMetaLoading}>
              <Skeleton width="50%">
                <Typography>.</Typography>
              </Skeleton>
            </div>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
            <Skeleton width="50%">
              <Typography>.</Typography>
            </Skeleton>
          </CardContent>
        </div>
      </Card>
    );
  }
  const { title } = article;
  const { content, image } = articleContent;

  function excerptContent(data) {
    return data && `${data.replace(/<[^>]*>?/gm, '').substring(0, 100)}...`;
  }

  return (
    <Card
      className={classes.root}
      onClick={() => setSelectedAricle({ ...article, ...articleContent })}
    >
      {contentLoading ? (
        <Skeleton animation="wave" variant="rect" className={classes.cover} />
      ) : (
        <CardMedia className={classes.cover} image={image} title={title} />
      )}
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          {article && <ArticleMeta article={article} />}
          {contentLoading ? (
            <>
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
              <Skeleton width="50%">
                <Typography>.</Typography>
              </Skeleton>
            </>
          ) : (
            <Typography>{excerptContent(content)}</Typography>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

Article.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]).isRequired,
  loading: PropTypes.bool.isRequired,
  setSelectedAricle: PropTypes.func.isRequired,
};
