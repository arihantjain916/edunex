import { CheckCurrentPath } from "../../../utils/checkCurrentPath";
import Link from "next/link";
import { cx } from "@/utils/filterClass";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  BlogIcon,
  UpdateProfileIcon,
  ThreedotIcon,
} from "../../../utils/SVGIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SideNavigationBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);

  function LogoutClick() {
    dispatch(logout());
    router.push("/");
  }

  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform bg-white dark:bg-slate-900"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 px-3 py-4 dark:border-slate-700">
        <Link
          href="#"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <span className="ml-3 text-2xl font-bold">EduNex</span>
        </Link>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link
              href="#"
              className={cx(
                "flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white hover:bg-gray-300",
                CheckCurrentPath("/dashboard/Arihant1234")
                  ? "bg-gray-300"
                  : "dark:bg-slate-700"
              )}
            >
              <HomeIcon />
              <span className="ml-3 flex-1 whitespace-nowrap">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={cx(
                "flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white hover:bg-gray-300",
                CheckCurrentPath("/dashboard/Blog")
                  ? "bg-gray-300"
                  : "dark:bg-slate-700"
              )}
            >
              <BlogIcon />
              <span className="ml-3 flex-1 whitespace-nowrap">Blog</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={cx(
                "flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white hover:bg-gray-300",
                CheckCurrentPath("/dashboard/Blog")
                  ? "bg-gray-300"
                  : "dark:bg-slate-700"
              )}
            >
              <UpdateProfileIcon />
              <span className="ml-3 flex-1 whitespace-nowrap">
                Update Profile
              </span>
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
        <div className="mt-auto flex overflow-x-hidden">
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium text-black dark:text-white">
              {email}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <ThreedotIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <button onClick={LogoutClick}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigationBar;
