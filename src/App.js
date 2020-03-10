import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { curriedPage } from "./Page";
import { NAVIGATION_ROUTES_CONFIG_PATH } from "./constants";
import { Header } from "./components/Header/Header";
import "./style.scss";
import { Waves } from "./components/Waves/Waves";

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

  if (navigationRoutes) {
    const navigationPageUrlConfigMap = navigationRoutes.reduce(
      (accumulator, currentValue) => {
        accumulator[`/${currentValue.file}`] = { title: currentValue.title };
        return accumulator;
      },
      {}
    );

    return (
      <div className="app-container">
        <Waves />
        <div>
          <Header />
          <div className="route-container-bg">
            <Router>
              <div className="route-container">
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
          </div>
        </div>
      </div>
    );
  } else {
    return <div>error or loading</div>;
  }
}
