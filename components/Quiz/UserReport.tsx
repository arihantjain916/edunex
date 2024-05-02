"use client";
import PageTitle from "../ui/pagetitle";
import { message, Modal, Table } from "antd";
import { getUserReport } from "@/utils/reportapi";
import moment from "moment";
import { useState, useEffect } from "react";

const UserReport = () => {
  const [reportsData, setReportsData] = useState<any[]>([]);
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text: any, record: any) => <>{record.exam.name}</>,
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

  const getData = async () => {
    try {
      const response = await getUserReport();
      console.log(response.success);
      if (response.success) {
        setReportsData(response);
      } else {
        message.error(response.message);
      }

      console.log("ReportsData: ", reportsData);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
};

export default UserReport;
