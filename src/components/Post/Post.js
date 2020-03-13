import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";
import Loader from "react-spinners/BeatLoader";
import "./style.scss";

export function Post({ path, published, title, type = "post", page, loader }) {
  const [markdown, setMarkdown] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeout;
    setErrorAfterTimeout();
    function setErrorAfterTimeout() {
      timeout = setTimeout(function() {
        setError(true);
      }, 3000);
    }

    if (!loader) {
      fetch(path)
        .then(async response => {
          return { text: await response.text(), status: response.status };
        })
        .then((data = {}) => {
          if (data.status !== 404) {
            setMarkdown(data.text);
            setError(false);
            clearTimeout(timeout);
          } else {
            setErrorAfterTimeout();
          }
        })
        .catch(e => {
          setErrorAfterTimeout();
        });
    }
    return function cleanup() {
      clearTimeout(timeout);
    };
  }, [path, loader]);

  function renderError() {
    return (
      <div className="not-found">
        <img src={require("./not-found.svg")} alt="Content not found" />
        <span>Failed to load content</span>
      </div>
    );
  }

  if (!markdown || error) {
    return (
      <div className="post-container loading">
        <div className="loader">
          {error ? (
            renderError()
          ) : (
            <Loader size={20} color={"#ffffffbf"} loading={true} />
          )}
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
    <div key={`${path}-post`}>
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
