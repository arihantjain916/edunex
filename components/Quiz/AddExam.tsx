"use client";
import { Col, Form, message, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import {
  addExam,
  updateExam,
  getExambyId,
  deleteQuestion,
} from "@/utils/examapi";
import AddEditQues from "./AddEditQues";
import PageTitle from "../ui/pagetitle";
import { useRouter } from "next/navigation";
import { Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/loading";

const { TabPane } = Tabs;
type ExamProps = {
  id?: string;
  question: any;
};

const AddExam = (props: any) => {
  const [examData, setExamData] = useState<ExamProps | undefined>(undefined);
  const [showAddEditQuestion, setShowAddEditQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const { totalMarks, passingMarks, duration } = values;

      if (passingMarks <= 0 || !passingMarks) {
        throw new Error("Passing Marks should be greater than 0");
      }
      if (totalMarks <= 0 || !totalMarks) {
        throw new Error("Total Marks should be greater than 0");
      }
      if (duration <= 0 || !duration) {
        throw new Error("Exam duration should be greater than 0");
      }

      if (parseInt(totalMarks) < parseInt(passingMarks)) {
        throw new Error("Total Marks should be greater than Passing Marks");
      }

      if (
        /^\d+$/.test(totalMarks) === false ||
        /^\d+$/.test(passingMarks) === false ||
        /^\d+$/.test(duration) === false
      ) {
        throw new Error("Marks or duration should be a number");
      }

      setLoading(true);
      const response = props.id
        ? await updateExam(props.id, values)
        : await addExam(values);

      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(
          response.response?.data?.error || "Something went wrong"
        );
      }
    } catch (error: any) {
      message.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getExamData = async () => {
    try {
      const response = await getExambyId(props.id);
      if (response.success) {
        setExamData(response.data);
      } else {
        throw new Error(
          response.response?.data?.error || "Something went wrong"
        );
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const deleteQuestionHandler = async (quesId: Number) => {
    try {
      const response = await deleteQuestion(quesId);
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        throw new Error(
          response.response?.data?.error || "Something went wrong"
        );
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (props.id) {
      getExamData();
    }
  }, [props.id]);

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      </>
    );
  }

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
      render: (
        text: any,
        record: {
          id: Number;
        }
      ) => (
        <div className="flex gap-2">
          <div
            onClick={() => {
              setSelectedQuestion(record);
              setShowAddEditQuestion(true);
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
              deleteQuestionHandler(record.id);
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
                    <input id="input" type="phone" />
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
                    <input id="input" type="phone" inputMode="numeric" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input id="input" type="phone" inputMode="numeric" />
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
                    onClick={() => setShowAddEditQuestion(true)}
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
          setShowAddEditQuestionModal={setShowAddEditQuestion}
          showAddEditQuestionModal={showAddEditQuestion}
          examId={props.id}
          refreshData={() => props.id && getExamData()}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
};

export default AddExam;
