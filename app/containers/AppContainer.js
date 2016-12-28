// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div className="pt-dark full-height">
        {this.props.children}
      </div>
    );
  }
}
