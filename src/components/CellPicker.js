import React, { useState } from "react";
import Menu from "./Menu";
import { CELL, CELL_CATEGORY } from "../data";

import {
  SEARCH,
  ALL, CELL_CAT_NAME,
  CELL_NAME, CELL_CAT_DESC, CELL_DESC,
  NO_CELLS } from "../data/lang.en.js";

import "../css/Cell.scss";
import "../css/CellPicker.scss";

const FilterButton = ({ categoryId, isSelected, onClick }) => {
  return (
    <button className={isSelected ? "selected" : ""}
        onClick={() => onClick(categoryId)}>
      <h3>{(categoryId ? CELL_CAT_NAME[categoryId] : ALL).toUpperCase()}</h3>
    </button>
  );
};

const CellList = ({ filterText, filterCategory, onPickCell }) => {
  let cells = Object.values(CELL);
  if(filterCategory) {
    cells = cells.filter(cell => cell.category === filterCategory);
  }
  if(filterText) {
    cells = cells.filter(cell => cell.id.toLowerCase().indexOf(filterText.toLowerCase()) >= 0);
  }

  return (
    <div className="cellList">
      {cells.length ? (
        cells.map(({ id, category }) => {
          const cat = CELL_CATEGORY[category];
          return (
            <button key={id} className="cell"
              onClick={() => onPickCell(id)}>
              <span>
                <img
                  alt={CELL_CAT_DESC[cat.id]}
                  src={cat.img}/>
                <span>
                  <h2>{CELL_NAME[id]}</h2>
                  <h3>{CELL_CAT_DESC[cat.id]}</h3>
                  <span>{CELL_DESC[id]}</span>
                </span>
              </span>
            </button>
          );
        })
      ) : (
        <h2>{NO_CELLS}</h2>
      )}
    </div>
  );
};

export default ({ onPickCell }) => {
  const [ filterText, setFilterText ] = useState("");
  const [ filterCategory, setFilterCategory ] = useState(null);

  return (
    <Menu className="cellPicker">
      <input type="text" className="searchBox"
          placeholder={SEARCH}
          value={filterText}
          onChange={e => setFilterText(e.target.value)}/>
      <div className="filterButtons">
        <FilterButton key={"ALL"}
            categoryId={null}
            isSelected={!filterCategory}
            onClick={setFilterCategory}/>
        {Object.keys(CELL_CATEGORY).map(id => (
          <FilterButton key={id}
            categoryId={id}
            isSelected={filterCategory === id}
            onClick={setFilterCategory}/>
        ))}
      </div>
      <CellList
        filterText={filterText}
        filterCategory={filterCategory}
        onPickCell={onPickCell}/>
    </Menu>
  );
}