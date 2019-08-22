import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UID } from "react-uid";
import { pickCell, setFilter } from "../actions/CellPicker";
import { CELL, CELL_CATEGORY } from "../data";

import styles from "../css/CellPicker.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterText = useSelector(state => state.cellPicker.filter.text);
  return (
    <input type="text" value={filterText}
        onChange={e => dispatch(setFilter({
          text: e.target.value
        }))}/>
  );
};

const FilterButton = ({ categoryId, groupName }) => {
  const dispatch = useDispatch();
  const filterCategoryId = useSelector(state => state.cellPicker.filter.categoryId);
  const isChecked = filterCategoryId === categoryId;
  return (
    <label className={isChecked ? styles.selectedFilterButton : ""}>
      <input type="radio" name={groupName}
          onChange={() => dispatch(setFilter({ categoryId }))}
          checked={isChecked && "checked"}/>
      { categoryId }
    </label>
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
      {cells.map(({ id }) => (
        <button key={id} onClick={() => dispatch(pickCell(id))}>
          {id}
        </button>
      ))}
    </div>
  );
};


export default () => {
  return (
    <>
      <SearchBox/>
      <UID name={ uid => `radio-${uid}` }>
        {uid => (
          <div className={styles.filterButtons}>
            {Object.keys(CELL_CATEGORY).map(id => (
              <FilterButton categoryId={id} key={id} groupName={uid}/>
            ))}
          </div>
        )}
      </UID>
      <CellList/>
    </>
  );
}