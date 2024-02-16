"use client";
import SpecificBlog from "../../../components/Blog/specificBlog";

export default function Blog({ params }: any) {
  return (
    <>
      <SpecificBlog slug={params.slug} />
    </>
  );
}
