import { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data } from "./data";
import produce from "immer";

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case "MOVE":
      {
        draft[action.from] = draft[action.from] || [];
        draft[action.to] = draft[action.to] || [];
        const [removed] = draft[action.from].splice(action.fromIndex, 1);
        draft[action.to].splice(action.toIndex, 0, removed);
      }
      break;
    default:
      break;
  }
});

const App = () => {
  const [state, dispatch] = useReducer(dragReducer, {
    items: data,
  });

  const onDragEnd = useCallback((result) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      dispatch({
        type: "MOVE",
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index,
      });
    }
  }, []);

  return (
    <div>
      HELLLOOWOOWOWOW TIUTLE
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='items' type='PERSON'>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: "block", position: "static", color: "blue", border: "1px solid black" }}
                >
                  {state.items?.map((person, index) => {
                    return (
                      <Draggable key={person.id} draggableId={person.id} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div>
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <div style={{ height: "100px" }}>SPACESSSS</div>
          <Droppable droppableId='items2' type='PERSON'>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: "block", position: "static", color: "red", border: "1px solid orange" }}
                >
                  {state.items2?.map((person, index) => {
                    return (
                      <Draggable key={person.id} draggableId={person.id} index={index}>
                        {(provided, snapshot) => {
                          return (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div>
                                <span>
                                  {person.name.first} {person.name.last}
                                </span>
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
