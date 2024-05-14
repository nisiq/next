import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "@/lib/types" 
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, title: string) => void;

  deleteTask: (id: Id) => void;
  tasks: Task[];
}
function ColumnContainer(props: Props) {
  const { column, createTask, updateTask, deleteTask, tasks } = props;

  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: column.id as UniqueIdentifier,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#efefef]  w-[400px] h-[800px] max-h-[800px] rounded-md flex flex-col text-black"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className=" text-md h-[60px] cursor-grab rounded-md rounded-b-none p-4 font-bold  flex items-center justify-between"
      >
        <div className="flex gap-2 font-inter text-xl mt-3 ">
          {/* <div className="flex justify-center items-center bg-[#161C22] px-2 py-1 text-sm rounded-full">
          </div> */}
          {column.title}
        </div>
        <button
          onClick={() => createTask(column.id)}
          className="stroke-[#9E2896] hrounded px-1 py-2"
        >
          <PlusIcon />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/*Footer */}
    </div>
  );
}

export default ColumnContainer;
