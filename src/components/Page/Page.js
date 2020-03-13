import React from "react";
import { PAGES_PUBLIC_REL_PATH } from "../../constants";
import { NewsFeed } from "../NewsFeed/NewsFeed";
import { Post } from "../Post/Post";
import { home } from "../../configs/home-config.json";

import "./style.scss";

function removeSlashFromURL(url) {
  if (url && url[0] === "/") {
    return url.substring(1);
  }
  return url;
}

export function Page(props) {
  const { match, sidebarImageUrl, loader } = props;
  const fileName = match.url === "/" ? "home" : removeSlashFromURL(match.url);
  const markdownPath = `${PAGES_PUBLIC_REL_PATH}/${fileName}.md`;
  const hightlightNewsPost = home.hightlightNewsPost || null;

  const isHome = match.url === "/home" || match.url === "/";
  const isNews = match.url === "/news";

  function renderContent() {
    return (
      <>
        {(isNews || isHome) && (
          <NewsFeed useOnly={isHome} only={hightlightNewsPost} />
        )}
        {!isNews && <Post path={markdownPath} page={true} loader={loader} />}
      </>
    );
  }
  return (
    <div className="page-container">
      <div className="content-column">
        {!isHome && renderContent()}

        {isHome && hightlightNewsPost !== undefined && renderContent()}
      </div>
      <div className="fun-column">
        {<img className="swing" alt="Random Cartoon" src={sidebarImageUrl} />}
      </div>
    </div>
  );
}

export function curriedPage(initializationProps = {}) {
  return props => Page({ ...initializationProps, ...props });
}
