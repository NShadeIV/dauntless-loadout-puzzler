import { pickCell } from "./CellPicker";

export const OPEN_CELL_PICKER = "openCellPicker";
export const openCellPicker = () => ({
  type: OPEN_CELL_PICKER
});
export const cancelCellPicker = () => pickCell();

export const REORDER_CELLS = "reorderCells";
export const reorderCells = ({startIndex, endIndex}) => ({
  type: REORDER_CELLS,
  startIndex,
  endIndex
});