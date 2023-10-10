import React from "react";
import Todo from "./todo";

interface Task {
  todoID: number;
  title: string;
  date: Date;
  datetime: Date;
  completed: boolean;
}

interface ToDoListProps {
  tasks: Task[]; // Task[] คือประเภทของ tasks
  onEditTask: (todoID: number, title: string) => void;
  onDeleteTask: (todoID: number) => void;
  onToggleCompleted : (todoID:number) => void;
}

export default function ToDoList({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleCompleted
}: ToDoListProps) {
  const reversedTasks = tasks.slice().reverse();
  return (
    <>
      {/* ใส่่ task */}
      {reversedTasks.map((task) => (
        <Todo key={task.todoID} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onToggleCompleted={onToggleCompleted} />
      ))}
    </>
  );
}
