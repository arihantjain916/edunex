"use client";
import PageTitle from "../Layout/pageTitle";
import { deleteExam, getAllExam } from "@/utils/examapi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message, Table } from "antd";

const QuizIndex = () => {
  const router = useRouter();
  const [exams, setExams] = useState([]);

  async function getExamData() {
    const res = await getAllExam();
    if (res.success) {
      setExams(res.data);
    } else {
      message.error(res.response?.data?.error || "Something went wrong");
    }
  }

  async function deleteExamf(examId: String) {
    const res = await deleteExam(examId);
    if (res.success) {
      getExamData();
    } else {
      message.error(res.response?.data?.error || "Something went wrong");
    }
  }

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => router.push(`/admin/exams/edit/${record.id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record.id)}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getExamData();
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => router.push("/dashboard/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="divider"></div>

      <Table columns={columns} dataSource={exams} />
    </div>
  );
};

export default QuizIndex;
