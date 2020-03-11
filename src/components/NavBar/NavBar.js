import React from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";

export function NavBar({ navigationRoutes }) {
  let location = useLocation();
  function renderNavBarRoutes() {
    return navigationRoutes.map(navigationRoute => {
      if (navigationRoute.type === "external") {
        return (
          <li key={navigationRoute.route}>
            <a
              href={navigationRoute.route}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navigationRoute.title}
            </a>
          </li>
        );
      }

      const filePath = `/${navigationRoute.file}`;
      return (
        <li
          key={navigationRoute.file}
          className={location.pathname === filePath ? "current" : ""}
        >
          <Link to={filePath}>{navigationRoute.title}</Link>
        </li>
      );
    });
  }

  if (navigationRoutes) {
    return <ul className="navBar">{renderNavBarRoutes()}</ul>;
  }
  return null;
}
