import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCellFilter } from "../actions";

export default () => {
  const dispatch = useDispatch();
  const filterText = useSelector(state => state.cellFilter.text);
  return (
    <input type="text" value={filterText}
        onChange={e => dispatch(setCellFilter({
          text: e.target.value
        }))}/>
  );
};
