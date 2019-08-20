export const SET_CELL_FILTER = "SET_CELL_FILTER";
export const setCellFilter = ({categoryId = null, text = ""}) => ({
  type: SET_CELL_FILTER,
  categoryId,
  text
});