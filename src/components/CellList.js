import React from "react";
import { useSelector } from "react-redux";
import { CELL } from "../data";

import styles from "../css/CellList.module.css";

export default () => {
  const cellFilter = useSelector(state => state.cellFilter);
  
  let cells = Object.values(CELL);
  if(cellFilter.categoryId) {
    cells = cells.filter(cell => cell.category === cellFilter.categoryId);
  }
  if(cellFilter.text) {
    cells = cells.filter(cell => cell.id.toLowerCase().indexOf(cellFilter.text.toLowerCase()) >= 0);
  }

  return (
    <ul className={styles.cellList}>
      {cells.map(({ id }) => (
        <li>{id}</li>
      ))}
    </ul>
  );
};
