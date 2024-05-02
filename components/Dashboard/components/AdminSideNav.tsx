"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineQuiz,
  MdOutlineDashboard,
} from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { logout } from "@/redux/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { QuizIcon } from "@/utils/SVGIcon";

const AdminSideNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { username } = useSelector((state: RootState) => state.auth);

  function handleLogout() {
    dispatch(logout());
    router.push("/auth/login");
  }

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-2xl text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              EduNex
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {/* Dashboard Link */}
              <Link href={`/dashboard/${username}`}>
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Dashboard
                  </h3>
                </div>
              </Link>
              {/* Blog Link */}
              <Link href="/dashboard/blog">
                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Blog
                  </h3>
                </div>
              </Link>
              {/* Comments Link */}
              <Link href="/dashboard/comment">
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <FaRegComment className="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Comments
                  </h3>
                </div>
              </Link>
              {/* Analytics Link */}
              <Link href="/dashboard/quiz">
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <QuizIcon style="text-2xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Quiz
                  </h3>
                </div>
              </Link>
              <Link href="/dashboard/exams">
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <PiExam className="text-3xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Exam
                  </h3>
                </div>
              </Link>
              <Link href="/dashboard/report">
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <TbReportAnalytics className="text-3xl text-gray-600 group-hover:text-white " />
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    Report
                  </h3>
                </div>
              </Link>
            </div>
            {/* Settings Link */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>
            </div>
            {/* Logout Button */}
          </div>
          <div className="mt-auto">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </h3>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default AdminSideNavbar;
