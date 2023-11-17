import React, { useState, Fragment, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

interface Task {
  todoID: number;
  title: string;
  note: string;
  status_task: string;
  date: Date;
  dueDate: string;
  datetime: Date;
  completed: boolean;
}

interface ToDoListProps {
  task: Task; // Task[] คือประเภทของ tasks
  onEditTask: (
    todoID: number,
    title: string,
    note: string,
    status_task: string,
    dueDate: string
  ) => void;
  onDeleteTask: (todoID: number) => void;
  onToggleCompleted: (todoID: number) => void;
}

export default function Todo({
  task,
  onEditTask,
  onDeleteTask,
  onToggleCompleted,
}: ToDoListProps) {
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------
  const { t } = useTranslation();
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [note, setNote] = useState(task.note);
  const [status_task, setStatusTask] = useState(task.status_task);

  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDone = () => {
    if (title.trim()) {
      onEditTask(task.todoID, title.trim(), note, status_task, dueDate);
      setEditing(false);
    }
    console.log(note);
    console.log(status_task);
    console.log(dueDate);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleChangeNote = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNote(e.target.value);
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log(e.target.value);
    console.log(new Date(e.target.value).toLocaleDateString());
    setDueDate(e.target.value);
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const selectedStatus = e.target.value;
    let selectedStatusClass = "";

    onEditTask(task.todoID, title.trim(), note, selectedStatus, dueDate);
    setStatusTask(selectedStatus);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(task.title);
    setNote(task.note);
  };

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    onDeleteTask(task.todoID);
  };

  const handleToggleCompleted = () => {
    onToggleCompleted(task.todoID);
  };

  const taskcreate: string = new Date(task.date).toLocaleDateString();
  const taskcreateTime: string = new Date(task.date).toLocaleTimeString();
  const taskdueDate: string = new Date(task.dueDate).toLocaleDateString();

  // ตัดวินาทีออก
  const createTime = taskcreateTime.slice(0, -3);
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {editing ? (
        <li key={task.todoID} className="flex gap-x-4 sm:gap-x-6 py-4 sm:py-5">
          <form
            onSubmit={handleDone}
            className="flex w-full min-w-0 gap-x-6 items-center flex-wrap"
          >
            <div className="flex w-full min-w-0 gap-x-6 items-center">
              <div className="min-w-0 flex-auto">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-base sm:leading-9"
                  placeholder="Add a new task..."
                  onChange={handleChange}
                />
              </div>

              <div className="flex text-xs sm:text-sm leading-5 text-gray-900">
                <button type="submit">
                  <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 cursor-pointer text-accent" />
                </button>
                <button type="button" onClick={handleCancel}>
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 cursor-pointer text-red text-secondary" />
                </button>
              </div>
            </div>

            <div className="flex w-full min-w-0 gap-x-6 items-center pt-3">
              <div className="mt-1 min-w-0 flex-auto">
                <label
                  htmlFor="note"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Note
                </label>
                <input
                  type="text"
                  name="note"
                  id="note"
                  value={note}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-base sm:leading-9"
                  placeholder="Add a new task..."
                  onChange={handleChangeNote}
                />
              </div>
            </div>

            <div className="flex w-full min-w-0 gap-x-6 items-center pt-3">
              <div className="mt-1 min-w-0 flex-auto">
                <label
                  htmlFor="duedate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  name="duedate"
                  id="duedate"
                  value={dueDate.toString()}
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-base sm:leading-9"
                  placeholder="Add a new task..."
                  onChange={handleChangeDate}
                />
              </div>
            </div>
          </form>
        </li>
      ) : (
        <>
          <li
            key={task.todoID}
            className="flex justify-between gap-x-4 sm:gap-x-6 py-4 sm:py-5"
          >
            <div className="flex min-w-0 gap-x-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-accent text-sm sm:text-base mr-2"
                onClick={handleToggleCompleted}
                checked={task.completed}
                readOnly
              />
              <div className="min-w-0 flex-auto">
                <p>
                  <sup
                    className={
                      task.status_task === "Pending"
                        ? "text-[#f1c232]"
                        : task.status_task === "In Progress"
                        ? "text-[#FF666D]"
                        : task.status_task === "Complete"
                        ? "text-[#98E695]"
                        : "#000000"
                    }
                  >
                    {task.status_task}{" "}
                  </sup>
                </p>
                <p
                  className={`${
                    task.completed
                      ? "line-through decoration-wavy decoration-secondary"
                      : "text-base font-semibold leading-6 text-gray-900 warp break-all sm:text-base"
                  } cursor-default`}
                >
                  {task.title}
                </p>

                <p
                  className={`${
                    task.completed
                      ? "line-through decoration-wavy decoration-secondary"
                      : "text-base font-semibold leading-6 text-gray-500 warp break-all sm:text-base"
                  } cursor-default`}
                >
                  {task.note}
                </p>
              </div>
            </div>

            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="flex text-xs sm:text-sm leading-5 text-gray-900">
                <select
                  id="status_task"
                  name="status_task"
                  autoComplete="status_task"
                  className="block rounded-md border-0 px-2 py-0 mr-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={task.status_task}
                  onChange={handleChangeStatus}
                >
                  <option value={"Not Started"}>Not Started</option>
                  <option value={"Pending"} className="text-[#f1c232]">
                    Pending
                  </option>
                  <option value={"In Progress"} className="text-[#FF666D]">
                    In Progress
                  </option>
                  <option value={"Complete"} className="text-[#98E695]">
                    Complete
                  </option>
                </select>

                <PencilSquareIcon
                  className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 cursor-pointer text-accent"
                  onClick={handleEdit}
                />
                <TrashIcon
                  className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 cursor-pointer text-red-500"
                  onClick={openModal}
                />
              </div>

              <p className="mt-1 text-xs sm:text-xs leading-5 text-gray-500">
                <time dateTime={taskcreate} className="text-gray-500">
                  {taskcreate} : {createTime}
                </time>
                <br />
                <time dateTime={task.dueDate} className="text-gray-500">
                  Due Date : {new Date(task.dueDate).toLocaleDateString()}
                </time>
              </p>
              {/* {task.date} */}
            </div>
          </li>
        </>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {t("task_delete_title")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {t("task_delete_description")}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mx-1"
                      onClick={closeModal}
                    >
                      {t("close_button")}
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 mx-1"
                      onClick={handleDelete}
                    >
                      {t("task_delete_button")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
