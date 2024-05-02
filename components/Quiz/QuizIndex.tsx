"use client";

import PageTitle from "../Layout/pageTitle";
import { deleteExam, getAllExam } from "@/utils/examapi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/loading";
import { render } from "react-dom";

const QuizIndex = () => {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchExams() {
    setLoading(true);
    const res = await getAllExam();
    setLoading(false);
    if (res.success) {
      setExams(res.data);
    } else {
      message.error(res.response?.data?.error || "Something went wrong");
    }
  }

  async function handleDeleteExam(examId: String) {
    setLoading(true);
    const res = await deleteExam(examId);
    setLoading(false);
    if (res.success) {
      fetchExams();
    } else {
      message.error(res.response?.data?.error || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  const columns = [
    { title: "Exam Name", dataIndex: "name" },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text: any, record: any) => {
        return `${record.duration} seconds`;
      },
    },
    { title: "Category", dataIndex: "category" },
    { title: "Total Marks", dataIndex: "totalMarks" },
    { title: "Passing Marks", dataIndex: "passingMarks" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <div
            onClick={() => router.push(`/dashboard/exams/edit/${record.id}`)}
          >
            <FontAwesomeIcon
              icon={faPencil}
              width={20}
              height={20}
              className="text-bg-red-600"
            />
          </div>
          <div onClick={() => handleDeleteExam(record.id)}>
            <FontAwesomeIcon
              icon={faTrash}
              width={20}
              height={20}
              className="text-bg-red-600"
            />
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />
        <button
          className="primary-outlined-btn flex items-center justify-center"
          onClick={() => router.push("/dashboard/exams/add")}
        >
          <FontAwesomeIcon
            icon={faAdd}
            width={20}
            height={20}
            className="text-bg-red-600"
          />
          Add Exam
        </button>
      </div>
      <div className="divider"></div>
      {exams.length > 0 ? (
        <Table columns={columns} dataSource={exams} />
      ) : (
        <p>No exams found.</p>
      )}
    </div>
  );
};

export default QuizIndex;
