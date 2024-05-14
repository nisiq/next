import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { Id, Task } from "@/lib/types" 
import { CSS } from "@dnd-kit/utilities";
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Ellipsis from "../icons/Ellipsis";
import StatusToDo from "./StatusToDo";
import StatusInProgress from "./StatusInProgress";
import StatusDone from "./StatusDone";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id as UniqueIdentifier,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      opacity-30
    bg-white p-2.5 h-[150px]  items-center flex text-left rounded-xl cursor-grab relative
    "
      ></div>
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="bg-white relative p-2.5 h-[20%] min-h-[100px] items-center flex text-left rounded-xl cursor-grab hover:ring-2 hover:ring-rose-500"
      >
        <textarea
          className="
        h-[90%]
        w-full resize-none border-none rounded bg-transparent text-white focus:outline-none
        "
          value={task.title}
          autoFocus
          placeholder="Task title here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white relative py-[90px] px-[15px] h-[150px] min-h-[100px] items-center flex text-left rounded cursor-grab "
    >
      <div className="flex flex-col ">
        <div className="flex">
          <p className="my-auto h-[90%] font-inter font-semibold text-lg w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
            {task.title}
          </p>
          <Menu>
            <MenuHandler>
              <IconButton className="bg-transparent border-none shadow-none hover:shadow-none hover:bg-[#f3f3f3] hover:opacity-70">
                <Ellipsis />
              </IconButton>
            </MenuHandler>
            <MenuList className="font-inter">
              <MenuItem className="hover:bg-[#f3f3f3]">
                Editar Task
              </MenuItem>
              <MenuItem
                className="hover:bg-[#f3f3f3]"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                Deletar Task
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <p className="my-auto h-[90%] text-[#777777] text-sm font-inter w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.description}
        </p>

        {task.status === "A fazer" && <StatusToDo />}
        {task.status === "Em desenvolvimento" && <StatusInProgress />}
        {task.status === "Finalizado" && <StatusDone />}

        <div className="flex items-center gap-4">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            className="w-[2.3rem] h-[2.3rem]"
          />
          <div>
            <Typography
              variant="h6"
              className="text-[#777777] font-inter font-normal text-base mt-1"
            >
              Joaozinho da Silva
            </Typography>
          </div>
          <h1 className="font-inter font-medium text-[#777777] text-sm mt-[5px] ml-[53px]">
            10/10/2020
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
