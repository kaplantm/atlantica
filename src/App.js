import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { curriedPage } from "./components/Page/Page";
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
          <Router>
            <Header navigationRoutes={navigationRoutes} />

            <div className="route-container-bg">
              <div className="route-container">
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
            </div>
          </Router>
        </div>
      </div>
    );
  } else {
    return <div>error or loading</div>;
  }
}
