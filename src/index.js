import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
import CellPicker from "./components/CellPicker";

import "./css/styles.css";

const store = createStore(reducer);

const App = () => {
  return (
    <div className="App">
      <CellPicker/>
    </div>
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
