import DashboardPage from "@/components/Dashboard/page";
import { Seo } from "@/components/Seo";

type Params = {
  params: {
    username: string;
  };
};

export default function Dashboard({ params }: Params) {
  return (
    <>
      <Seo title="Dashboard" description="Dashboard" />
      <DashboardPage username={params.username} />
    </>
  );
}
