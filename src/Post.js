import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

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
      {type}
      {page ? <h1>TITLE: {title}</h1> : <h3>POST TITLE:{title}</h3>}
      <span>{published}</span>
      <ReactMarkdown source={markdown} />
    </div>
  );
}
