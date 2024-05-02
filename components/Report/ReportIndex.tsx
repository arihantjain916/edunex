"use client";

import PageTitle from "../ui/pagetitle";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { getAllReport } from "@/utils/reportapi";
import Loading from "@/app/loading";

const ReportIndex = () => {
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    examName: "",
    userName: "",
  });
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text: any, record: any) => <>{record?.exam?.name}</>,
    },
    {
      title: "UserName",
      dataIndex: "userName",
      render: (text: any, record: any) => <>{record?.user?.username}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text: any, record: any) => (
        <>{moment(record?.createdAt).format("DD-MM-YYYY ")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text: any, record: any) => <>{record?.exam?.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text: any, record: any) => <>{record?.exam?.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text: any, record: any) => (
        <>{record?.result?.correctAnswer?.length}</>
      ),
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text: any, record: any) => <>{record?.result?.verdict}</>,
    },
  ];

  const getData = async (tempFilters: any) => {
    try {
      setLoading(true);
      const response = await getAllReport(tempFilters);
      if (response.success) {
        setReportData(response.data);
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(filters);
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({ examName: "", userName: "" });
    getData({ examName: "", userName: "" });
  };

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          id="input"
          type="text"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          id="input"
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button className="primary-outlined-btn" onClick={handleClearFilters}>
          Clear
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportData} className="mt-2" />
      {loading && <Loading />}
    </div>
  );
};

export default ReportIndex;
