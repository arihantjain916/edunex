"use client";

import WriteBlog from "@/components/Blog/writeBlog";
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
