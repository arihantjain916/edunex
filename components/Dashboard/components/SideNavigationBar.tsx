"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import AdminSideNavbar from "./AdminSideNav";
import UserSideNav  from "./UserSideNav";

const SideNavbar = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  return <>{role === "ADMIN" ? <AdminSideNavbar /> : <UserSideNav />}</>;
};

export default SideNavbar;
