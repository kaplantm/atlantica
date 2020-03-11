import React from "react";
import { ASSETS_URL } from "./constants";
import { NewsFeed } from "./NewsFeed";
import { Post } from "./components/Post/Post";

export function Page(props) {
  const { match } = props;
  const fileName = match.url === "/" ? "/home" : match.url;
  const markdownPath = `${ASSETS_URL}pages/${fileName}.md`;

  return match.url === "/news" ? (
    <NewsFeed />
  ) : (
    <Post path={markdownPath} page={true} />
  );
}

export function curriedPage(initializationProps = {}) {
  return props => Page({ ...initializationProps, ...props });
}
