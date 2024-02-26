"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AdminDashboard from "./Admin/page";
import UserDashboard from "./User/page";

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
    (state: any) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }

    if (props.username !== username) {
      console.log("You are not authorized to access this page");
      //   router.push("/404")
    }
  }, [props.username, isAuthenticated, router, username]);

  return <>{renderDashboard(role)}</>;
};

export default DashboardPage;
