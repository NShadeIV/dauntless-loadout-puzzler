import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UID } from "react-uid";

import { CELL_CATEGORY } from "../data";
import { setCellFilter } from "../actions";

import styles from "../css/FilterButtons.module.css";

const Link = ({ categoryId, groupName }) => {
  const dispatch = useDispatch();
  const filterCategoryId = useSelector(state => state.cellFilter.categoryId);
  const isChecked = filterCategoryId === categoryId;
  return (
    <label className={isChecked && styles.selected}>
      <input type="radio" name={groupName}
          onChange={() => dispatch(setCellFilter({categoryId}))}
          checked={isChecked && "checked"}/>
      {categoryId}
    </label>
  );
};

export default () => {
  return (
    <UID name={ uid => `radio-${uid}` }>
      {uid => (
        <div className={styles.filterButtons}>
          {Object.keys(CELL_CATEGORY).map(id => (
            <Link categoryId={id} key={id} groupName={uid}/>
          ))}
        </div>
      )}
    </UID>
  );
};
