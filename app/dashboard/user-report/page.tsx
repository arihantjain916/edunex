import { Seo } from "@/components/Seo";
import UserReport from "@/components/Quiz/UserReport";
export default function ExamPage() {
  return (
    <>
      <Seo title="User Exam Report" description="User Exam Report" />
      <UserReport />
    </>
  );
}
