import React from "react";
import "./style.scss";
import { NavBar } from "../NavBar/NavBar";

export function Header({ navigationRoutes }) {
  return (
    <header>
      <div>
        <h1>RAD Atlantica</h1>
      </div>
      {navigationRoutes && <NavBar navigationRoutes={navigationRoutes} />}
    </header>
  );
}
