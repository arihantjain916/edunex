"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserDashboard = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        This is User Dashboard
      </h1>
      <h2 className="text-2xl">Welcome {username}!</h2>
    </>
  );
};

export default UserDashboard;
