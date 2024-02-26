import DashboardPage from "@/components/Dashboard/page";

export default function Dashboard({ params }: any) {
  return (
    <>
      <DashboardPage username={params.username} />
    </>
  );
}
