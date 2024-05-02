import { useRouter } from "next/navigation";

const Instruction = (props: any) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be completed in {props.examData.duration} secons.</li>
        <li>
          Exam will be submitted automatically after {props.examData.duration}{" "}
          seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{" "}
          <span className="font-bold">{props.examData.totalMarks}</span>.
        </li>
        <li>
          Passing marks of the exam is{" "}
          <span className="font-bold">{props.examData.passingMarks}</span>.
        </li>
      </ul>

      <div className="flex gap-2">
        <button
          className="primary-outlined-btn"
          onClick={() => router.push("/")}
        >
          CLOSE
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            props.startTimer();
            props.setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default Instruction;
