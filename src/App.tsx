import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/20/solid";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import ToDoList from "./components/ToDoList";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Task {
  todoID: number;
  title: string;
  date: Date;
  datetime: Date;
  completed: boolean;
}

function App() {
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(""); // ตั้งค่าภาษาเริ่มต้น
  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage); // ถ้ามีค่าใน Local Storage ให้ใช้ภาษานั้น
      setSelectedLanguage(selectedLanguage); // ตั้งค่า state เพื่อให้แสดงภาษาที่ถูกเลือก
    } else {
      setSelectedLanguage("th"); // ถ้าไม่มีค่าใน Local Storage ให้ใช้ภาษาไทย
    }
  }, []);

  const changeLanguageWeb = (lng: string) => {
    i18n.changeLanguage(lng.toLowerCase()); // เปลี่ยนภาษา
    setSelectedLanguage(lng.toUpperCase()); // แสดงข้อความในช่องแบบตัวใหญ่
    localStorage.setItem("selectedLanguage", lng.toLowerCase()); // บันทึกภาษาที่เลือกลง Local Storage
  };

  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return storedTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask = {
      todoID: Date.now(),
      title,
      date: new Date(),
      datetime: new Date(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (todoID: number, title: string) => {
    setTasks(
      tasks.map((task) => (task.todoID === todoID ? { ...task, title } : task))
    );
  };

  const deleteTask = (todoID: number) => {
    setTasks(tasks.filter((task) => task.todoID !== todoID));
    toast.success("Successfully deleted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const toggleCompleted = (todoID: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.todoID === todoID) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  //------------------------ ส่วนจัดการลบ --------------------------------------------------------------------

  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    if (tasks.length === 0) {
      toast.error("No data is available to delete.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setIsOpen(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
    setIsOpen(false);

    toast.success("Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //------------------------ ส่วนจัดการลบ --------------------------------------------------------------------

  return (
    <>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="navbar rounded-box">
            <div className="flex justify-end flex-1 px-2">
              <div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn m-1">
                    <p>{selectedLanguage.toUpperCase()}</p>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-15 active"
                  >
                    <li>
                      <button onClick={() => changeLanguageWeb("TH")}>
                        TH
                      </button>
                    </li>
                    <li>
                      <button onClick={() => changeLanguageWeb("EN")}>
                        EN
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6CABDD] to-[#1C2C5B] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center cursor-default">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                To Do List
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t("title")}
              </p>
            </div>

            {/* Components AddTaskForm -------------------------------------------- */}
            <AddTaskForm onAddTask={addTask} />
            <div className="mx-auto mt-6 max-w-2xl rounded-3xl ring-1 ring-gray-300 lg:mx-0 lg:flex lg:max-w-none my-tasks-all">
              <div className="p-8 sm:p-7 sm:mt-5 lg:flex-auto">
                <div className="">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="w-full cursor-default ">
                      <div className="flex justify-between container-my-tasks">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                          {t("my_tasks")}
                        </h2>
                        <button
                          className="btn btn-sm text-gray-600 sm:pb-2 rounded-lg sm:items-end button-container-my-tasks"
                          onClick={openModal}
                        >
                          {t("clear_all_task")}
                          <ArchiveBoxXMarkIcon className="h-4 w-4 text-gray-500 text-red-500" />
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-md lg:text-lg">
                          {t("my_tasks_description")}
                        </p>
                      </div>
                    </div>
                    <ul className="divide-y divide-gray-100 border-t border-gray-200 pt-4 sm:pt-3 lg:mx-0 lg:max-w-none">
                      {/* Components ToDoList ----------------------------------------------- */}
                      {/* <ToDoList /> */}

                      {tasks.length ? (
                        <ToDoList
                          tasks={tasks}
                          onEditTask={editTask}
                          onDeleteTask={deleteTask}
                          onToggleCompleted={toggleCompleted}
                        />
                      ) : (
                        <div className=" w-full h-[80%] flex items-center justify-center overflow-hidden">
                          <p className=" text-gray-500 text-center z-10">
                            {t("empty_task")}
                          </p>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ToastContainer />
      </div>

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
                    {t("task_delete_all")}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {t("task_delete_description_all")}
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
                      onClick={clearTasks}
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

export default App;
