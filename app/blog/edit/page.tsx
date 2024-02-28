"use client";

import WriteBlog from "../../../components/InputBlog/main";
import { useSearchParams } from "next/navigation";

export default function BlogEdit() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <>
      <WriteBlog blogId={id} />
    </>
  );
}
