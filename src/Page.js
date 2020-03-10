import React from "react";
import { ASSETS_URL } from "./constants";
import { NewsFeed } from "./NewsFeed";
import { Post } from "./Post";

export function Page(props) {
  const { match, navigationPageUrlConfigMap } = props;
  console.log("PAGE", props);
  const fileName = match.url === "/" ? "/home" : match.url;
  const markdownPath = `${ASSETS_URL}pages/${fileName}.md`;
  const pageConfig = navigationPageUrlConfigMap[fileName] || {};

  return match.url === "/news" ? (
    <NewsFeed />
  ) : (
    <Post path={markdownPath} title={pageConfig.title} page={true} />
  );
}

export function curriedPage(initializationProps = {}) {
  return props => Page({ ...initializationProps, ...props });
}
