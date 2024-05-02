"use client";
import { Form, message, Modal } from "antd";
import React from "react";
import { addQuestion, editQuestion } from "@/utils/examapi";
import Loading from "@/app/loading";

const AddEditQues = ({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}: any) => {
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values: any) => {
    try {
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      let response;
      if (selectedQuestion) {
        setLoading(true);
        response = await editQuestion(selectedQuestion.id, requiredPayload);
        setLoading(false);
      } else {
        setLoading(true);
        response = await addQuestion(requiredPayload);
        setLoading(false);
      }

      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
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
  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
        setSelectedQuestion(null);
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D,
          correctOption: selectedQuestion?.correctOption,
        }}
      >
        <Form.Item name="name" label="Question">
          <input id="input" type="text" />
        </Form.Item>
        <Form.Item name="correctOption" label="Correct Option">
          <input id="input" type="text" />
        </Form.Item>

        <div className="flex gap-3">
          <Form.Item name="A" label="Option A">
            <input id="input" type="text" />
          </Form.Item>
          <Form.Item name="B" label="Option B">
            <input id="input" type="text" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item name="C" label="Option C">
            <input id="input" type="text" />
          </Form.Item>
          <Form.Item name="D" label="Option D">
            <input id="input" type="text" />
          </Form.Item>
        </div>

        <div className="flex justify-end mt-2 gap-3">
          <button
            className="primary-outlined-btn"
            type="button"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            Cancel
          </button>
          <button className="primary-contained-btn">Save</button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditQues;
