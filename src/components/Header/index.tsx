import React, { Component } from "react";
import "./index.scss";

type Props = {};

type State = {};

export default class Header extends Component<Props, State> {
  state = {};

  render() {
    return (
      <header className="app__header">
        <div className="app__header-logo-container">
          <h3>Contilio</h3>
        </div>
        <div className="app__header-menu-container">
          <ul className="menu-list">
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Account</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
