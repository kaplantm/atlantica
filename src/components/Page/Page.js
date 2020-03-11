import React from "react";
import { ASSETS_URL } from "../../constants";
import { NewsFeed } from "../NewsFeed/NewsFeed";
import { Post } from "../Post/Post";
import "./style.scss";

export function Page(props) {
  const { match } = props;
  const fileName = match.url === "/" ? "/home" : match.url;
  const markdownPath = `${ASSETS_URL}pages/${fileName}.md`;

  const content =
    match.url === "/news" ? (
      <NewsFeed />
    ) : (
      <Post path={markdownPath} page={true} />
    );

  const randomImageList = ["squid", "pig", "chick"];
  const randomImageName =
    randomImageList[Math.floor(Math.random() * randomImageList.length)];

  return (
    <div className="page-container">
      <div className="content-column">{content}</div>

      <div className="fun-column">
        {
          <img
            className="swing"
            alt="Cute cuboid cartoon animal"
            src={`${ASSETS_URL}images/${randomImageName}.svg`}
          />
        }
      </div>
    </div>
  );
}

export function curriedPage(initializationProps = {}) {
  return props => Page({ ...initializationProps, ...props });
}
