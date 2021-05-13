import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import Article from './components/Article';

import ArticleDetailDialog from './components/ArticleDetailDialog';

const useStyles = makeStyles({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedAricle, setSelectedAricle] = useState(null);
  const [meta, setMeta] = useState({ current_page: 1, had_more: true });

  const classes = useStyles();

  function getArticleList(page = 1) {
    fetch(`/api/v1/articles?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles((prevState) => [...prevState, ...data.articles]);
        setMeta(data.meta);
        setLoading(false);
      });
  }

  useEffect(() => {
    getArticleList();
  }, []);

  function renderArticleList() {
    if (loading) {
      return [...Array(30).keys()].map((item) => (
        <Article key={item} loading />
      ));
    }
    return articles.map((item) => (
      <Article
        article={item}
        key={item.id}
        setSelectedAricle={setSelectedAricle}
      />
    ));
  }

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={() => getArticleList(meta.current_page + 1)}
        hasMore={meta.had_more}
        loader={(
          <div className={classes.loader} key={0}>
            <CircularProgress disableShrink color="secondary" />
          </div>
        )}
      >
        {renderArticleList()}
      </InfiniteScroll>
      {selectedAricle && (
        <ArticleDetailDialog
          article={selectedAricle}
          setSelectedAricle={setSelectedAricle}
        />
      )}
    </>
  );
}
