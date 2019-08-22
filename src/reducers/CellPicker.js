import { combineReducers } from "redux";

import { SET_FILTER, PICK_CELL } from "../actions/CellPicker";

const FILTER_DEFAULT = {categoryId: null, text: ""};
const filter = (state = FILTER_DEFAULT, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        categoryId: action.categoryId,
        text: action.text
      };
    case PICK_CELL:
      return FILTER_DEFAULT;
    default:
      return state;
  }
};

export default combineReducers({
  filter
});
