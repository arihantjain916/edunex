"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AdminDashboard from "./Admin/page";
import UserDashboard from "./User/page";
import { RootState } from "@/redux/store";
export interface Props {
  username: string;
}

const renderDashboard = (role: string) => {
  if (role === "ADMIN") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

const DashboardPage = (props: Props) => {
  const router = useRouter();
  const { username, isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }

    if (props.username !== username) {
      router.push("/unauthorized");
    }
  }, [props.username, isAuthenticated, username]);

  return <>{renderDashboard(role)}</>;
};

export default DashboardPage;
