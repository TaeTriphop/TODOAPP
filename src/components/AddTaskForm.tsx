import React, { useState, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
interface AddTaskFormProps {
  onAddTask: (title: string) => void;
  // darkTheme: boolean;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------
  const { t } = useTranslation();
  //------------------------ ส่วนจัดการภาษา --------------------------------------------------------------------

  //------------------------ ส่วนจัดการ Validation --------------------------------------------------------------------
  const [title, setTitle] = useState("");

  type Inputs = {
    todoRequired: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (errors.todoRequired) {
      console.log("Title is empty, task not submitted");
    } else {
      onAddTask(data.todoRequired);
      setTitle("");
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
            <div className="flex items-center mb-4">
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
          </div>
        </div>
      </form>
    </>
  );
}
