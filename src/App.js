import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { curriedPage } from "./components/Page/Page";
import {
  NAVIGATION_ROUTES_CONFIG_PATH,
  SIDEBAR_CONFIG_PATH,
  ASSETS_URL
} from "./constants";
import { Header } from "./components/Header/Header";
import "./style.scss";
import { Waves } from "./components/Waves/Waves";

export default function App() {
  const [navigationRoutes, setNavigationRoutes] = useState();
  const [sidebarImageUrl, setSidebarImageUrl] = useState();

  useEffect(() => {
    fetchNavigationData();
    fetchSideBarImage();
  }, []);

  async function fetchNavigationData() {
    await fetch(NAVIGATION_ROUTES_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          setNavigationRoutes(JSON.parse(data).navigation);
        } catch (e) {
          console.log(e);
        }
      });
  }
  async function fetchSideBarImage() {
    await fetch(SIDEBAR_CONFIG_PATH)
      .then(response => {
        return response.text();
      })
      .then((data = {}) => {
        try {
          const images = JSON.parse(data).sidebar.images;
          const randomImage = images[Math.floor(Math.random() * images.length)];

          setSidebarImageUrl(`${ASSETS_URL}images/${randomImage}`);
        } catch (e) {}
      });
  }

  if (navigationRoutes && sidebarImageUrl) {
    const navigationPageUrlConfigMap = navigationRoutes.reduce(
      (accumulator, currentValue) => {
        accumulator[`/${currentValue.file}`] = { title: currentValue.title };
        return accumulator;
      },
      {}
    );

    const curriedPageParams = { navigationPageUrlConfigMap, sidebarImageUrl };
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
                  component={curriedPage(curriedPageParams)}
                />
                <Route
                  exact
                  path="/:pageName"
                  component={curriedPage(curriedPageParams)}
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
