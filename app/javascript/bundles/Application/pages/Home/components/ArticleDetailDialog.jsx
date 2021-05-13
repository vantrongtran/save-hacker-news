import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

import ArticleMeta from './ArticleMeta';

const useStyles = makeStyles({
  appBar: {
    display: 'flex',
    justifyContent: 'end',
    position: 'sticky',
  },
  articleImageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  articleTitle: {
    display: 'flex',
    justifyContent: 'center',
  },
  articleTitleImage: {
    objectFit: 'contain',
    maxHeight: 300,
    maxWidth: '80vw',
  },
});

export default function ArticleDetailDialog({ article, setSelectedAricle }) {
  const classes = useStyles();

  return (
    <Dialog fullScreen open scroll="paper">
      <div className={classes.appBar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setSelectedAricle(null)}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle className={classes.articleTitle}>
        {article.title}
        {article && <ArticleMeta article={article} />}
      </DialogTitle>
      <DialogContent dividers>
        <Container fixed>
          <div className={classes.articleImageWrapper}>
            <img
              src={article.image}
              alt={classes.articleTitle}
              className={classes.articleTitleImage}
            />
          </div>
          <DialogContentText>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </DialogContentText>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

ArticleDetailDialog.propTypes = {
  article: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedAricle: PropTypes.func.isRequired,
};
