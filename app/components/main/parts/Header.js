// @flow
import React, { Component } from "react";
import { IndexLink } from "react-router";

export class Header extends Component {
  logout: Function;

  constructor(props) {
    super(props);
    this.logout = props.logout;
  }

  handleLogout = () => {
    this.logout();
    this.context.router.push("/");
  };

  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-right">
          <IndexLink to="/main/configuration" className="pt-button pt-minimal pt-icon-cog" activeClassName="pt-active"/>
          <button className="pt-button pt-minimal pt-icon-log-out" onClick={this.handleLogout}/>
        </div>
      </nav>
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};
