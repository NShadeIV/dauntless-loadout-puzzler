export const SET_FILTER = "cellPicker/setFilter";
export const setFilter = ({ categoryId = null, text = "" }) => ({
  type: SET_FILTER,
  categoryId,
  text
});

export const PICK_CELL = "cellPicker/pickCell";
export const pickCell = ( cellId = null ) => ({
  type: PICK_CELL,
  cellId
})