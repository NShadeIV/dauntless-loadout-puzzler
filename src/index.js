import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

import { openCellPicker, cancelCellPicker, reorderCells } from "./actions"
import reducer from "./reducers";

import CellPicker from "./components/CellPicker";
import DraggableList from "./components/DraggableList";

import "./css/styles.scss";

const store = createStore(reducer);

const App = () => {
  const dispatch = useDispatch();
  const cellPickerIsOpen = useSelector(state => state.cellPickerIsOpen);
  const cells = useSelector(state => state.cells);
  return (
    <>
      <div class="main">
        <div></div>
        {cellPickerIsOpen ? (
          <CellPicker/>
        ) : (
          <>
            <button onClick={() => dispatch(openCellPicker())}>
              add preference
            </button>
            <DraggableList
              list={cells}
              onReorder={e => dispatch(reorderCells(e))}
              render={cell => cell.content}/>
          </>
        )}
      </div>
      <footer>
        <button onClick={() => dispatch(cancelCellPicker())}>
          back
        </button>
      </footer>
    </>
  );
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
