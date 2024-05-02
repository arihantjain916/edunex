"use client";

import PageTitle from "../ui/pagetitle";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { getAllReport } from "@/utils/reportapi";

const ReportIndex = () => {
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    examName: "",
    userName: "",
  });

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text: any, record: any) => <>{record.exam.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text: any, record: any) => <>{record.user.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text: any, record: any) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text: any, record: any) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text: any, record: any) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text: any, record: any) => (
        <>{record.result.correctAnswers.length}</>
      ),
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text: any, record: any) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async (tempFilters: any) => {
    try {
      const respose = await getAllReport(tempFilters);
      if (respose.success) {
        setReportData(respose.data);
      } else {
        message.error(respose.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const boll = reportData.length === 0;
  useEffect(() => {
    getData(filters);
  }, []);
  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          disabled={boll}
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          disabled={boll}
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          disabled={boll}
          className="primary-outlined-btn"
          onClick={() => {
            setFilters({
              examName: "",
              userName: "",
            });
            getData({
              examName: "",
              userName: "",
            });
          }}
        >
          Clear
        </button>
        <button
          disabled={boll}
          className="primary-contained-btn"
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportData} className="mt-2" />
    </div>
  );
};

export default ReportIndex;
