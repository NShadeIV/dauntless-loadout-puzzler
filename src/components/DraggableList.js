import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

// adapted from
// https://codepen.io/alexreardon/project/editor/ZyNMPo
export default ({ list, onReorder, className, children }) => {
  const reorderList = (result) => {
    // dropped outside the list
    if(!result.destination) {
      return; 
    }
    onReorder(result.source.index, result.destination.index);
  };
  return (
    <DragDropContext onDragEnd={reorderList}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            className={className}
            {...provided.droppableProps}
          >
            {list.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    {children(item)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </DragDropContext>
  );
};