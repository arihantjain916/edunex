import QuizIndex from "@/components/Quiz/QuizIndex";
import { Seo } from "@/components/Seo";
export default function ExamPage() {
  return (
    <>
      <Seo title="Exam" description="Exams" />
      <QuizIndex />
    </>
  );
}
