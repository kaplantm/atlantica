import React, { useState, useEffect } from "react";
import { ASSETS_URL, NEWS_CONFIG_PATH } from "../../constants";
import { Post } from "../Post/Post";

export function NewsFeed({ match, location }) {
  const [newsConfigArray, setNewsConfigArray] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(NEWS_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          setNewsConfigArray(JSON.parse(data).news);
        } catch (e) {
          // TODO: error renderer
          setError("Failed to Load Navigation Config");
        }
      });
  }, []);

  function fetchNews() {
    return newsConfigArray.map((newsConfig = {}) => {
      const { type, file, title, published } = newsConfig;
      return (
        <Post
          published={published}
          path={`${ASSETS_URL}pages/news/${file}.md`}
          type={type}
          title={title}
          key={file}
        />
      );
    });
  }

  return newsConfigArray ? (
    fetchNews()
  ) : (
    <div>No news yet! Check back for updates.</div>
  );
}
