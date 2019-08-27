import React from "react";

import "../css/styles.scss";

export default (props) => (
  <footer>
    <div className="extra"></div>
    {props.children}
  </footer>
);