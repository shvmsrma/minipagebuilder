import React, { Component } from "react";
import * as s from "./sideDrawer.module.scss";
class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={s.container}>Side Drawer</div>;
  }
}

export default SideDrawer;
