"use client";

import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { getAllExam } from "@/utils/examapi";
import PageTitle from "../Layout/pageTitle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/loading";

type QuizProps = {
  id: any;
  name: string;
  category: string;
  totalMarks: string;
  duration: string;
  passingMarks: string;
};

const QuizPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getExam = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await getAllExam();
      if (res.success) {
        setExams(res.data);
      } else {
        message.error(res.response?.data?.error || "Something went wrong");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Some error occured!!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getExam();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (exams.length === 0) {
    return (
      <>
        <div className="h-screen gap-3 p-4 flex justify-center items-center">
          <Image src="/emptyBox.png" width={70} height={70} alt="Empty Box" />
          <h2 className="text-2xl font-bold">No Quiz Found</h2>
        </div>
      </>
    );
  }

  return (
    <div>
      <PageTitle title={"Quizes"} />
      <div className="divider"></div>
      <Row gutter={[16, 16]}>
        {exams.map((exam: any) => (
          <Col span={6}>
            <div className="card-lg flex flex-col gap-1 p-2 ml-3">
              <h1 className="text-2xl">{exam.name}</h1>

              <h1 className="text-md">Category : {exam.category}</h1>

              <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
              <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
              <h1 className="text-md">Duration : {exam.duration}</h1>

              <button
                className="primary-outlined-btn"
                onClick={() => router.push(`/dashboard/write-exam/${exam.id}`)}
              >
                Start Exam
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default QuizPage;
