import React, { useState, useEffect } from "react";
import { ASSETS_URL, NEWS_CONFIG_PATH } from "../../constants";
import { Post } from "../Post/Post";
import "./style.scss";

export function NewsFeed({ only, useOnly }) {
  const [newsConfigArray, setNewsConfigArray] = useState();

  useEffect(() => {
    fetch(NEWS_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          setNewsConfigArray(JSON.parse(data).news);
        } catch (e) {
          console.log("Failed to Load News Config");
        }
      });
  }, []);

  function fetchNews() {
    return newsConfigArray.map((newsConfig = {}) => {
      const { type, file, title, published } = newsConfig;

      if (useOnly && file !== only) {
        return null;
      }
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

  return newsConfigArray ? fetchNews() : null;
}
