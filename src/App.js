import initialData from "./initial-data";
import Column from "./Column";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  let state = initialData;
  const onDragEnd = (results) => {
    //update the state
  };

  return (
    <>
      <DragDropContext  onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </>
  );
}

export default App;
