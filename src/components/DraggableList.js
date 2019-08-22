import React from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

// adapted from
// https://codepen.io/alexreardon/project/editor/ZyNMPo
export default ({ list, render, onReorder }) => {
  return (
    <DragDropContext
      onDragEnd={(result) => {
        // dropped outside the list
        if(!result.destination) {
          return; 
        }
        onReorder({
          startIndex: result.source.index,
          endIndex: result.destination.index});
      }}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {render(item)}
                    </div>
                    {provided.placeholder}
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