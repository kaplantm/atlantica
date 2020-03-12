import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";
import Loader from "react-spinners/BeatLoader";
import "./style.scss";

export function Post({ path, published, title, type = "post", page, loader }) {
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    if (!loader) {
      fetch(path)
        .then(response => {
          return response.text();
        })
        .then((data = {}) => {
          setMarkdown(data);
        });
    }
  }, [path, loader]);

  if (!markdown) {
    return (
      <div className="post-container loading">
        <div className="loader">
          <Loader size={20} color={"#ffffffbf"} loading={true} />
        </div>
      </div>
    );
  }
  if (
    markdown &&
    (markdown.includes("404: Not Found") || markdown.includes("Cannot GET"))
  ) {
    console.warn("Post not found:", title);
    return null;
  }
  return (
    <div>
      <div className={`post-container ${type}`}>
        <div className="post-header">
          <span className="published">{published}</span>
          {title && (
            <h3 className={`${published && "small-top-margin"}`}>{title}</h3>
          )}
        </div>

        <ReactMarkdown source={markdown} escapeHtml={false} />
      </div>
    </div>
  );
}
