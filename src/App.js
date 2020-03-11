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

  function getCurriedPageParams() {
    const navigationPageUrlConfigMap = navigationRoutes.reduce(
      (accumulator, currentValue) => {
        accumulator[`/${currentValue.file}`] = { title: currentValue.title };
        return accumulator;
      },
      {}
    );

    return { navigationPageUrlConfigMap, sidebarImageUrl };
  }

  function renderRoutes() {
    if (!navigationRoutes || !sidebarImageUrl) {
      return <Route exact path="/" component={curriedPage({ loader: true })} />;
    }
    const curriedPageParams = getCurriedPageParams();
    return (
      <>
        <Route exact path="/" component={curriedPage(curriedPageParams)} />
        <Route
          exact
          path="/:pageName"
          component={curriedPage(curriedPageParams)}
        />
      </>
    );
  }
  return (
    <div className="app-container">
      <Waves />
      <div>
        <Router>
          <Header navigationRoutes={navigationRoutes} />

          <div className="route-container-bg">
            <div className="route-container">{renderRoutes()}</div>
          </div>
        </Router>
      </div>
    </div>
  );
}
