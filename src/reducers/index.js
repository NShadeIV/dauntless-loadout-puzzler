import { combineReducers } from "redux";

import { SET_CELL_FILTER } from "../actions";

const cellFilter = (state = {}, action) => {
  switch (action.type) {
    case SET_CELL_FILTER:
      return {
        categoryId: action.categoryId,
        text: action.text
      };
    default:
      return state;
  }
};

export default combineReducers({
  cellFilter
});
