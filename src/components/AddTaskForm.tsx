import React, { useState, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

interface AddTaskFormProps {
  onAddTask: (
    title: string,
    note: string,
    status_task: string,
    dueDate: string
  ) => void;
  // darkTheme: boolean;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------
  const { t } = useTranslation();
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------

  //------------------------ ส่วนจัดการ Validation --------------------------------------------------------------------
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  type Inputs = {
    todoRequired: string;
    note: string;
    status_task: string;
    dueDate: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (errors.todoRequired) {
      console.log("Title is empty, task not submitted");
    } else {
      onAddTask(data.todoRequired, data.note, data.status_task, data.dueDate);
      setTitle("");
      setNote("");
      setStatus("");
      setDueDate("");
    }
  };

  //------------------------ ส่วนจัดการ Validation --------------------------------------------------------------------

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-300 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-5 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-2 flex items-center cursor-default">
              {t("add_task")}{" "}
              <PlusCircleIcon className="h-6 w-6 text-gray-500 ml-2" />
            </h3>
            <div className="flex items-center mb-2">
              <input
                {...register("todoRequired", { required: true })}
                type="text"
                id="todoRequired"
                value={title}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-base sm:leading-9"
                placeholder={t("add_new_task")}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="btn btn-accent sm:h-12 md:h-12 text-white px-4 py-2 rounded-md ml-2"
                type="submit"
              >
                {t("add_button")}
              </button>
            </div>
            {errors.todoRequired && (
              <span className="text-red-500">{t("todoRequired")}</span>
            )}

            <div className="flex items-center mt-4 mb-4">
              <input
                {...register("note", { required: false })}
                type="text"
                id="note"
                value={note}
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-base sm:leading-9"
                placeholder={t("todoRemark")}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="status_task"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-1">
                  <select
                    {...register("status_task", { required: false })}
                    id="status_task"
                    name="status_task"
                    autoComplete="status_task"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value={"Not Started"}>Not Started</option>
                    <option value={"Pending"} className="text-[#f1c232]">Pending</option>
                    <option value={"In Progress"} className="text-[#FF666D]">In Progress</option>
                    <option value={"Complete"} className="text-[#98E695]">Complete</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Due date
                </label>
                <div className="mt-1">
                  <input
                    {...register("dueDate")}
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    autoComplete="dueDate"
                    className="picker block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
