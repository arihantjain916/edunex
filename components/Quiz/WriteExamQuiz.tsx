"use client";

import { message } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { getExambyId } from "@/utils/examapi";
import { addReport } from "@/utils/reportapi";
import Instruction from "./Instruction";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
// import * as LottiePlayer from "@lottiefiles/lottie-player";

type ExamProp = {
  id: string;
  title: string;
  duration: number;
  passingMarks: any;
  questions: QuestionProp[];
};

type QuestionProp = {
  name: String;
  id: string;
  question: string;
  options: OptionProp[];
  correctOption: string;
};

type OptionProp = {
  value: string;
  label: string;
};

type ReportProp = {
  username: string;
  examId: string;
  result: ResultProp;
};

type ResultProp = {
  correctAnswers: QuestionProp[];
  wrongAnswers: QuestionProp[];
  verdict: "Pass" | "Fail";
};

const WriteExamQuiz = ({ id }: { id: String }) => {
  const { username } = useSelector((state: RootState) => state.auth);
  const [examData, setExamData] = useState<ExamProp | any>(null);
  const [questions, setQuestions] = useState<QuestionProp[] | any>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<any>(0);
  const [selectedOptions, setSelectedOptions] = useState<OptionProp | any>({});
  const [result, setResult] = useState<ResultProp | any>({});
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getexamData = async () => {
    try {
      setLoading(true);
      const response = await getExambyId(id);
      console.log(response);

      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.question);
        setSecondsLeft(response.data.duration);
        setLoading(false);
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswer: any[] = [];
      let wrongAnswer: any[] = [];

      questions.forEach((question: any, index: any) => {
        if (question?.correctOption === selectedOptions[index]) {
          correctAnswer.push(question);
        } else {
          wrongAnswer.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswer.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswer,
        wrongAnswer,
        verdict,
      };
      setResult(tempResult);

      setLoading(true);

      const response = await addReport({
        username,
        examId: id,
        result: tempResult,
      });

      if (response.success) {
        message.success("Report added successfully");
        setView("result");
        setLoading(false);
      } else {
        message.error(response.response?.data?.error || "Something went wrong");
      }
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const Intervalid = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(Intervalid);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (id) {
      getexamData();
    }
  }, []);

  if(loading){
    return(
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instruction
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} :{" "}
                {questions[selectedQuestionIndex].name}
              </h1>

              <div className="timer">
                <span className="text-2xl">{secondsLeft}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 flex-col ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option,
                        });
                      }}
                    >
                      <h1 className="text-xl">
                        {option} :{" "}
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}

              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex  items-center mt-2 justify-center result">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-black">RESULT</h1>
              <div className="divider"></div>
              <div className="marks">
                <h1 className="text-md text-black">
                  Total Marks : {examData.totalMarks}
                </h1>
                <h1 className="text-md text-black">
                  Obtained Marks :{result?.correctAnswers?.length || 0}
                </h1>
                <h1 className="text-md text-black">
                  Wrong Answers : {result?.wrongAnswers?.length || 0}
                </h1>
                <h1 className="text-md text-black">
                  Passing Marks : {examData.passingMarks}
                </h1>
                <h1 className="text-md text-black">
                  VERDICT :{result.verdict}
                </h1>

                <div className="flex gap-2 mt-2">
                  <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setSecondsLeft(examData.duration);
                    }}
                  >
                    Retake Exam
                  </button>
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_ya4ycrti.json"
                  // background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  // background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="flex flex-col gap-2">
            {questions.map((question: any, index: any) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`
                  flex flex-col gap-1 p-2 ${
                    isCorrect ? "bg-success" : "bg-error"
                  }
                `}
                >
                  <h1 className="text-xl">
                    {index + 1} : {question.name}
                  </h1>
                  <h1 className="text-md">
                    Submitted Answer : {selectedOptions[index]} -{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer : {question.correctOption} -{" "}
                    {question.options[question.correctOption]}
                  </h1>
                </div>
              );
            })}

            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => {
                  router.push("/");
                }}
              >
                Close
              </button>
              <button
                className="primary-contained-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                Retake Exam
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default WriteExamQuiz;
