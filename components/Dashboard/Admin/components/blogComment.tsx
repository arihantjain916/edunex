"use client";
import { useState, useEffect } from "react";
import { getAllCommentofUser } from "@/utils/commentapi";

export type commentType = {
  comment: string;
  publishedAt: string;
  blog: {
    title: string;
  };
};

const BlogComment = () => {
  const [commentData, usecommentData] = useState<commentType[]>([]);
  useEffect(() => {
    const getComment = async () => {
      const data = await getAllCommentofUser();
      usecommentData(data.data);
    };

    getComment();
  }, []);

  return (
    <>
      <main className="container mx-auto mt-8">
        {commentData?.map((d, i) => (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">{d.blog.title}</h2>
            <ul>
              <li className="bg-white rounded-lg shadow-md p-4 mb-4">
                <p className="text-gray-700">{d.comment}</p>
              </li>
            </ul>
          </section>
        ))}
      </main>
    </>
  );
};

export default BlogComment;
