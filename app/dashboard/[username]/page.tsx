import DashboardPage from "@/components/Dashboard/page";
import { Seo } from "@/components/Seo";

export default function Dashboard({ params }: any) {
  return (
    <>
      <Seo title="Dashboard" description="Dashboard" />
      <DashboardPage username={params.username} />
    </>
  );
}
