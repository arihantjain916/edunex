"use client";

import { Col, Form, message, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { addExam, updateExam, getExambyId } from "@/utils/examapi";
import AddEditQues from "./AddEditQues";
import PageTitle from "../ui/pagetitle";
import { useRouter } from "next/navigation";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/loading";

type ExamProps = {
  id?: string;
  question: any;
};

const AddExam = (props: any) => {
  const [examData, setexamData] = useState<ExamProps | undefined>(undefined);
  const [showAddEditQuestion, setshowAddEditQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      let response;
      if (props.id) {
        setLoading(true);
        response = await updateExam(props.id, values);
        setLoading(false);
      } else {
        setLoading(true);
        response = await addExam(values);
        setLoading(false);
      }
      if (response.success) {
        message.success(response.message);
        router.push("/dashboard/exams");
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const getExamData = async () => {
    try {
      const response = await getExambyId(props.id);
      if (response.success) {
        setexamData(response.data);
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const deleteQuestion = async (quesId: String) => {
    try {
      const response: any = await deleteQuestion(quesId);
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (props.id) {
      getExamData();
    }
  }, []);

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (text: any, record: any) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text: any, record: any) => {
        return ` ${record.correctOption} : ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-2">
          <div
            onClick={() => {
              setSelectedQuestion(record);
              setshowAddEditQuestion(true);
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              width={20}
              height={20}
              className="text-black"
            />
          </div>
          <div
            onClick={() => {
              deleteQuestion(record.id);
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              width={20}
              height={20}
              className="text-black"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title={props.id ? "Edit Exam" : "Add Exam"} />
      <div className="divider"></div>

      {(examData || !props.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam Name" name="name">
                    <input id="input" type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input id="input" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select id="select" name="category">
                      <option value="">Select Category</option>
                      <option value="Javascript">Javascript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="GK">GK</option>
                      <option value="ML">Machine Learning</option>
                      <option value="ebusiness">E-business</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input id="input" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input id="input" type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => router.push("/dashboard/exams")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {props.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end">
                  <button
                    className="primary-outlined-btn"
                    type="button"
                    onClick={() => setshowAddEditQuestion(true)}
                  >
                    Add Question
                  </button>
                </div>

                <Table
                  columns={questionsColumns}
                  dataSource={examData?.question || []}
                />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestion && (
        <AddEditQues
          setShowAddEditQuestionModal={setshowAddEditQuestion}
          showAddEditQuestionModal={showAddEditQuestion}
          examId={props.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
};

export default AddExam;
