"use client";

import { useState, useEffect } from "react";
import { message, Table } from "antd";
import moment from "moment";
import Loading from "@/app/loading";
import PageTitle from "../ui/pagetitle";
import { getUserReport } from "@/utils/reportapi";

const UserReport = () => {
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text: any, record: any) => <>{record?.exam?.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text: any, record: any) => (
        <>{moment(record?.createdAt).format("DD-MM-YYYY")}</>
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
        <>{record.result.correctAnswers.length}</>
      ),
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text: any, record: any) => <>{record?.result?.verdict}</>,
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserReport();
      console.log("Response from API:", response);
      if (response.success) {
        const formattedData = response.data.map(
          (item: { dateCreated: any; result: { correctAnswer: any } }) => ({
            ...item,
            date: item.dateCreated,
            result: {
              ...item.result,
              correctAnswers: item.result.correctAnswer,
            },
          })
        );
        console.log("Formatted Data:", formattedData);
        setReportsData(formattedData);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
};

export default UserReport;
