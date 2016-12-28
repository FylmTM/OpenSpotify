// @flow
import React, { Component } from "react";
import { IndexLink } from "react-router";
import styles from "./Sidebar.css";

export class Sidebar extends Component {

  render() {
    return (
      <ul className={`pt-list-unstyled full-height pt-elevation-1 dark-bg ${styles.menu}`}>
        <li>
          <IndexLink to="/main" className="pt-menu-item" activeClassName={styles.active}>Songs</IndexLink>
        </li>
      </ul>
    )
  }
}
