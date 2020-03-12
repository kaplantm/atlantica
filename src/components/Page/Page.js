import React, { useState } from "react";
import { ASSETS_URL, HOME_CONFIG_PATH } from "../../constants";
import { NewsFeed } from "../NewsFeed/NewsFeed";
import { Post } from "../Post/Post";
import "./style.scss";

export function Page(props) {
  const { match, sidebarImageUrl, loader } = props;
  const fileName = match.url === "/" ? "/home" : match.url;
  const markdownPath = `${ASSETS_URL}pages/${fileName}.md`;
  const [hightlightNewsPost, setHightlightNewsPost] = useState(undefined);

  function getHomeHighlightedPost() {
    fetch(HOME_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          setHightlightNewsPost(
            JSON.parse(data).home.hightlightNewsPost || null
          );
        } catch (e) {
          console.log("Failed to Load News Config");
        }
      });
  }

  const isHome = match.url === "/home";
  const isNews = match.url === "/news";

  if (isHome) {
    getHomeHighlightedPost();
  }

  function renderContent() {
    return (
      <>
        {(isNews || isHome) && (
          <NewsFeed useOnly={true} only={hightlightNewsPost} />
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
