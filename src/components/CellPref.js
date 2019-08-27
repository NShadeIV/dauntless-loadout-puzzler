import React from "react";
import { CELL, CELL_CATEGORY } from "../data";
import { CELL_NAME, CELL_CAT_DESC, CELL_DESC } from "../data/lang.en.js";

import "../css/Cell.scss";

export default ({ cellId, onClick }) => {
  const cell = CELL[cellId];
  const cat = CELL_CATEGORY[cell.category];
  return (
    <div className="cell"
      onClick={() => onClick(cellId)}>
      <span>
        <img
          alt={CELL_CAT_DESC[cat.id]}
          src={cat.img}/>
        <span>
          <h2>{CELL_NAME[cellId]}</h2>
          <h3>{CELL_CAT_DESC[cat.id]}</h3>
          <span>{CELL_DESC[cellId]}</span>
        </span>
      </span>
    </div>
  );
};