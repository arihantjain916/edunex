import { Seo } from "@/components/Seo";
import AddExam from "@/components/Quiz/AddExam";

export default function AddExamPage() {
  return (
    <>
      <Seo title="Exam" description="Exams" />
      <AddExam />
    </>
  );
}
