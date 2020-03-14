import React from "react";
import "./style.scss";
import { NavBar } from "../NavBar/NavBar";
import logo from "../../logo.svg";

export function Header({ navigationRoutes }) {
  return (
    <header>
      <div className="title-logo">
        <h1>RAD Atlantica</h1>
        <img src={logo} alt="Mermaid logo" />
      </div>
      {navigationRoutes && <NavBar navigationRoutes={navigationRoutes} />}
    </header>
  );
}
