import React, { useState } from "react";
import { render } from "react-dom";

import CellPicker from "./components/CellPicker";
import DraggableList from "./components/DraggableList";
import Footer from "./components/Footer";
import { BACK } from "./data/lang.en.js";

import "./css/styles.scss";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = () => {
  const [cellPickerIsOpen, setCellPickerIsOpen] = useState(true);
  const [nextCellKey, setNextCellKey] = useState(0);
  const [cells, setCells] = useState([]);
  const addCellToListAndClosePicker = (cellId) => {
    if(cellId) {
      setCellPickerIsOpen(false);
      setCells([...cells, {
        id: "cell" + nextCellKey,
        cellId: cellId
      }]);
      setNextCellKey(nextCellKey + 1);
    }
  };
  return (
    <>
      <div className="main">
        <div></div>
        {cellPickerIsOpen ? (
          <CellPicker key={nextCellKey}
            onPickCell={addCellToListAndClosePicker}/>
        ) : (
          <div>
            <button onClick={() => setCellPickerIsOpen(true)}>
              add preference
            </button>
            <DraggableList
              list={cells}
              onReorder={(startIndex, endIndex) => 
                setCells(reorder(cells, startIndex, endIndex))}
              render={cell => cell.cellId}/>
          </div>
        )}
      </div>
      <Footer>
        {cellPickerIsOpen &&
          <button onClick={() => setCellPickerIsOpen(false)}>
            <span>{BACK}</span>
          </button>
        }
      </Footer>
    </>
  );
};

render(
  <App />,
  document.getElementById("root")
);
