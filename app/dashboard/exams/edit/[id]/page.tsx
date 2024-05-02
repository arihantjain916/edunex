import { Seo } from "@/components/Seo";
import AddExam from "@/components/Quiz/AddExam";

type Props = {
  params: { id: string };
};
export default function AddExamPage({ params }: Props) {
  return (
    <>
      <Seo title="Exam" description="Exams" />
      <AddExam id={params.id} />
    </>
  );
}
