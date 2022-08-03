import React, { Component } from "react";
import "./index.scss";

type Props = {
  children: any;
};

type State = {};

export default class index extends Component<Props, State> {
  state = {};

  render() {
    return <div className="wrapper">{this.props.children}</div>;
  }
}
