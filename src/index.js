import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers";
import FilterSearch from "./components/FilterSearch";
import FilterButtons from "./components/FilterButtons";
import CellList from "./components/CellList";

import "./css/styles.css";

const store = createStore(reducer);

const App = () => {
  return (
    <div className="App">
      <FilterSearch/>
      <FilterButtons/>
      <CellList/>
    </div>
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
