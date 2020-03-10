import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { curriedPage } from "./Page";
import { NAVIGATION_ROUTES_CONFIG_PATH } from "./constants";

export default function App() {
  const [navigationRoutes, setNavigationRoutes] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(NAVIGATION_ROUTES_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          console.log(data);
          setNavigationRoutes(JSON.parse(data).navigation);
        } catch (e) {
          console.log(e);
          // TODO: error renderer
          setError("Failed to Load Navigation Config");
        }
      });
  }, []);

  function renderNavBarRoutes() {
    return navigationRoutes.map(navigationRoute => {
      return (
        <li key={navigationRoute.file}>
          <Link to={`/${navigationRoute.file}`}>{navigationRoute.title}</Link>
        </li>
      );
    });
  }

  // function generateRouter() {
  // const reducer = (accumulator, currentValue) => {
  //   accumulator[`/${currentValue.file}`] = { title: currentValue.title };
  //   return accumulator;
  // };
  //   const navigationPageUrlConfigMap = navigationRoutes.reduce(reducer, {});
  //   return (
  //     <>
  //     <Route
  //     exact
  //     path="/"
  //     component={curriedPage({ navigationPageUrlConfigMap, match: {url: "/home"} })}
  //   />
  //     <Route
  //       exact
  //       path="/:pageName"
  //       component={curriedPage({ navigationPageUrlConfigMap })}
  //     />
  //     </>
  //   );
  // }

  const reducer = (accumulator, currentValue) => {
    accumulator[`/${currentValue.file}`] = { title: currentValue.title };
    return accumulator;
  };

  if (navigationRoutes) {
    const navigationPageUrlConfigMap = navigationRoutes.reduce(reducer, {});
    return (
      <Router>
        <div>
          <ul>{navigationRoutes && renderNavBarRoutes()}</ul>
          <Route
            exact
            path="/"
            component={curriedPage({
              navigationPageUrlConfigMap
            })}
          />
          <Route
            exact
            path="/:pageName"
            component={curriedPage({ navigationPageUrlConfigMap })}
          />
        </div>
      </Router>
    );
  } else {
    return <div>error or loading</div>;
  }
}
