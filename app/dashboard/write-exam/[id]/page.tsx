// import UnauthorizedPage from "../../components/Extra-Page/AccessNotGranted/page";
import { Seo } from "@/components/Seo";
import WriteExamQuiz from "@/components/Quiz/WriteExamQuiz";

type paramsType = {
  params: {
    id: String;
  };
};

export default function WriteExamPage({ params }: paramsType) {
  return (
    <>
      <Seo title="Write Exam" description="write exam" />
      <WriteExamQuiz id={params.id} />
    </>
  );
}
