import { Seo } from "@/components/Seo";
import QuizPage from "@/components/Quiz/Home";
export default function QuizPageGlobal() {
  return (
    <>
      <Seo title="Quiz" description="Quiz" />
      <QuizPage />
    </>
  );
}
