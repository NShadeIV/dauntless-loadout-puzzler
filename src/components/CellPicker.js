import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { pickCell, setFilter } from "../actions/CellPicker";
import { CELL, CELL_CATEGORY } from "../data";
import {
  SEARCH,
  ALL, CELL_CAT_NAME,
  CELL_NAME, CELL_CAT_DESC, CELL_DESC,
  NO_CELLS } from "../data/lang.en.js";

import styles from "../css/CellPicker.module.scss";
import { menu } from "../css/styles.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterText = useSelector(state => state.cellPicker.filter.text);
  return (
    <input type="text" value={filterText}
        className={styles.searchBox}
        placeholder={SEARCH}
        onChange={e => dispatch(setFilter({
          text: e.target.value
        }))}/>
  );
};

const FilterButton = ({ categoryId }) => {
  const dispatch = useDispatch();
  const filterCategoryId = useSelector(state => state.cellPicker.filter.categoryId);
  const isSelected = filterCategoryId === categoryId;
  return (
    <button className={isSelected ? styles.selected : ""}
        onClick={() => dispatch(setFilter({ categoryId }))}>
      <h3>{(categoryId ? CELL_CAT_NAME[categoryId] : ALL).toUpperCase()}</h3>
    </button>
  );
};

const CellList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.cellPicker.filter);
  
  let cells = Object.values(CELL);
  if(filter.categoryId) {
    cells = cells.filter(cell => cell.category === filter.categoryId);
  }
  if(filter.text) {
    cells = cells.filter(cell => cell.id.toLowerCase().indexOf(filter.text.toLowerCase()) >= 0);
  }

  return (
    <div className={styles.cellList}>
      {cells.length ? (
        cells.map(({ id, category }) => {
          const cat = CELL_CATEGORY[category];
          return (
            <button key={id}
              onClick={() => dispatch(pickCell(id))}>
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
            </button>);
        })
      ) : (
        <h2>{NO_CELLS}</h2>
      )}
    </div>
  );
};

export default () => {
  return (
    <div className={classNames(styles.cellPicker, menu)}>
      <SearchBox/>
      <div className={styles.filterButtons}>
        <FilterButton categoryId={null} key={"ALL"}/>
        {Object.keys(CELL_CATEGORY).map(id => (
          <FilterButton categoryId={id} key={id}/>
        ))}
      </div>
      <CellList/>
    </div>
  );
}