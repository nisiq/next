'use client';
import { useMemo, useState } from "react";
import { Column, Id, Task } from "@/lib/types" 
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
  {
    id: "todo",
    title: "To do",
  },
  {
    id: "doing",
    title: "In progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //px
      },
    })
  );

  return (
    <div className=" flex mb-3 w-full items-center">
      <DndContext
        sensors={sensors}
        onDragStart={OnDragStart}
        onDragEnd={OnDragEnd}
        onDragOver={OnDragOver}
      >
        <div className="m-auto flex mt-2 w-[100%]">
          <div className="flex w-full justify-between">
            {columns.map((col) => (
              <div key={col.id}>
                <ColumnContainer
                  column={col}
                  createTask={createTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              </div>
            ))}
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      title: `Task ${tasks.length + 1}`,
      description: "Dashboard to TEF",
      status: "Finalizado",
    };
    setTasks([...tasks, newTask]);
  }

  function updateTask(id: Id, title: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, title };
    });

    setTasks(newTasks);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function OnDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function OnDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeId
      );

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function OnDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";

    if (!isActiveATask) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      tasks[activeIndex].columnId = overId;

      return arrayMove(tasks, activeIndex, overIndex);
    });
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
