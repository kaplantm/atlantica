import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { curriedPage } from "./components/Page/Page";
import { Header } from "./components/Header/Header";
import "./style.scss";
import { Waves } from "./components/Waves/Waves";
import { version } from "../package.json";
import { sidebar } from "./configs/sidebar-config.json";
import { navigation } from "./configs/navigation-config.json";
export default function App() {
  const sidebarImageUrl = `./assets/images/${
    sidebar.images[Math.floor(Math.random() * sidebar.images.length)]
  }`;

  function getCurriedPageParams() {
    const navigationPageUrlConfigMap = navigation.reduce(
      (accumulator, currentValue) => {
        accumulator[`/${currentValue.file}`] = { title: currentValue.title };
        return accumulator;
      },
      {}
    );

    return { navigationPageUrlConfigMap, sidebarImageUrl };
  }

  function renderRoutes() {
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
      <div className="app-container-inner">
        <Router basename="/">
          <Header navigationRoutes={navigation} />

          <div className="route-container-bg">
            <div className="route-container">{renderRoutes()}</div>
          </div>
        </Router>
      </div>
      <div className="invisible-metadata">Version: {version}</div>
    </div>
  );
}
