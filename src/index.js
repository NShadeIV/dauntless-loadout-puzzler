import React, { useState } from "react";
import { render } from "react-dom";

import CellPicker from "./components/CellPicker";
import DraggableList from "./components/DraggableList";
import Menu from "./components/Menu";
import CellPref from "./components/CellPref";
import Footer from "./components/Footer";

import "./css/styles.scss";
import "./css/CellPrefs.scss";

import { CELL } from "./data";
import { BACK } from "./data/lang.en.js";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CellPrefs = ({ cellPrefs, onReorder, onAddPrefClick }) => {
  return (
    <Menu className="cellPrefs">
      <button onClick={onAddPrefClick}>
        ADD PREFERENCE
      </button>
      <DraggableList className="cellList"
        list={cellPrefs}
        onReorder={onReorder}>
        {(cellPref) => (
          <CellPref key={cellPref.id} cellId={cellPref.cellId}/>
        )}
      </DraggableList>
    </Menu>
  );
};

const App = () => {
  const [cellPickerIsOpen, setCellPickerIsOpen] = useState(false);
  const [nextCellKey, setNextCellKey] = useState(0);
  const [cells, setCells] = useState(((count) => {
    const CELL_IDS = Object.keys(CELL);
    let ret = [];
    for(let i = 0; i < count; i++) {
      ret[i] = {
        id: "cell" + (i - count),
        cellId: CELL_IDS[i]
      };
    }
    return ret;
  })(0));
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
          <CellPrefs
            cellPrefs={cells}
            onReorder={(startIndex, endIndex) => 
              setCells(reorder(cells, startIndex, endIndex))}
            onAddPrefClick={() => setCellPickerIsOpen(true)}/>
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
