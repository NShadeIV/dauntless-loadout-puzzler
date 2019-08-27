import React from "react";
import classNames from "classnames";

import "../css/Menu.scss";

export default (props) => (
  <div className={classNames("menu", props.className)}>
    <div className="extra"></div>
    {props.children}
  </div>
);