"use client";

import { usePathname } from "next/navigation";

const PathName = () => {
  const pathname = usePathname();
  return <p>Current pathname: {pathname}</p>;
};

export default PathName;
