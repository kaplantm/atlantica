import React from "react";
import { PAGES_PUBLIC_REL_PATH } from "../../constants";
import { Post } from "../Post/Post";
import { news } from "../../configs/news-config.json";
import "./style.scss";

export function NewsFeed({ only, useOnly }) {
  return news.map((newsConfig = {}) => {
    const { type, file, title, published } = newsConfig;
    if (useOnly && file !== only) {
      return null;
    }
    return (
      <Post
        published={published}
        path={`${PAGES_PUBLIC_REL_PATH}/news/${file}.md`}
        type={type}
        title={title}
        key={file}
      />
    );
  });
}
