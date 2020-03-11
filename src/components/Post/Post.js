import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown/with-html";
import "./style.scss";
import { ASSETS_URL } from "../../constants";

export function Post({ path, published, title, type = "post", page }) {
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    fetch(path)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        setMarkdown(data);
      });
  }, [path]);

  if (markdown && markdown.includes("404: Not Found")) {
    console.warn("Post not found:", title);
    return null;
  }
  return (
    <div>
      <div className="post-container">
        {title && <h3>POST TITLE:{title}</h3>}
        <span>{published}</span>
        <ReactMarkdown source={markdown} escapeHtml={false} />
      </div>
      <img
        width="100"
        alt="Cuboid cartoon character"
        src={`${ASSETS_URL}images/squid.svg`}
      />
    </div>
  );
}
