export const SET_FILTER = "cellPicker/setFilter";
export const setFilter = ({categoryId = null, text = ""}) => ({
  type: SET_FILTER,
  categoryId,
  text
});