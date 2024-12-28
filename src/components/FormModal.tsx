"use client";

import { deleteStudent } from "@/lib/actions/admin.action";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TicketHolderForm = dynamic(() => import("./forms/ticket-holder-form"), {
  loading: () => (
    <div className="h-5 w-5 animate-spin text-primary p-2 shadow-md"></div>
  ),
});
const StudentForm = dynamic(() => import("./forms/student-form"), {
  loading: () => (
    <div className="h-5 w-5 animate-spin text-primary p-2 shadow-md"></div>
  ),
});
const StudentService = dynamic(() => import("./forms/student-service-form"), {
  loading: () => (
    <div className=" h-5 w-5 md:h-10 md:w-10 flex items-center justify-center animate-spin text-primary p-2 shadow-md"></div>
  ),
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  ticketHolder: (type, data) => <TicketHolderForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  studentService: (type, data) => <StudentService type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "student"
    | "ticketHolder"
    | "studentService"
    | "announcement"
    | "update";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string | undefined | null;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-primaryLight/10"
      : type === "update"
      ? "bg-primary/10"
      : "bg-primary/10";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const result = await deleteStudent(id);
      if (result?.success) {
        setOpen(false);
        toast.success(result.message);
      }
      console.log(result, "result");
      setLoading(false);
    } catch (error) {
      console.log(error, "error");
      setError("something went wrong");
      toast.error(
        "something went wrong while trying to delete the student  please try again"
      );
      setOpen(false);
      setLoading(false);
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen min-h-screen h-full  absolute left-0  top-0 bottom-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] max-h-screen overflow-y-scroll  ">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
