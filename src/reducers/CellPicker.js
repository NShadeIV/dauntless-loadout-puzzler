import { combineReducers } from "redux";

import { SET_FILTER } from "../actions/CellPicker";

const filter = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        categoryId: action.categoryId,
        text: action.text
      };
    default:
      return state;
  }
};

export default combineReducers({
  filter
});
