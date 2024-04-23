export const Adminlinks = [
  {
    title: "Dashboard",
    href: `/dashboard/${useSelector((state) => state.auth.username)}`,
    icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: Rss,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    variant: "ghost",
  },
];

export const Userlinks = [
  {
    title: "Dashboard",
    href: `/dashboard/${useSelector((state) => state.auth.username)}`,
    icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Course",
    href: "/users",
    icon: BookOpen,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    variant: "ghost",
  },
];

