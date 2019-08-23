import { combineReducers } from "redux";

import { OPEN_CELL_PICKER, REORDER_CELLS } from "../actions";
import { PICK_CELL as CELL_PICKER__PICK_CELL } from "../actions/CellPicker";

import cellPicker from "./CellPicker";

const reorder = (list, {startIndex, endIndex}) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const cells = (state = [], action) => {
  switch (action.type) {
    case CELL_PICKER__PICK_CELL:
      return action.cellId ? 
        [...state, {
          id: action.cellId,
          content: action.cellId
        }] :
        state;
    case REORDER_CELLS:
        return reorder(state, action);
    default:
      return state;
  }
};

const cellPickerIsOpen = (state = true, action) => {
  switch (action.type) {
    case OPEN_CELL_PICKER:
      return true;
    case CELL_PICKER__PICK_CELL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  cells,
  cellPickerIsOpen,
  cellPicker
});
