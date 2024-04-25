"use client";
import { useState, useEffect } from "react";
import { getBlogCommentData } from "@/utils/commentapi";
import Loading from "@/app/loading";

export type commentType = {
  comment: string;
};

type comment = {
  title: string;
  comments: commentType[];
};

const BlogComment = () => {
  const [commentData, usecommentData] = useState<comment[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getComment = async () => {
      const data = await getBlogCommentData();
      usecommentData(data.data);
    };
    setLoading(true);
    getComment();
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <main className="container mx-auto mt-8">
        {commentData?.map((d, i) => (
          <section className="mb-8" key={i}>
            <h2 className="text-xl font-bold mb-4">{d.title}</h2>
            <ul>
              {d.comments.map((a, b) => (
                <li key={b} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <p className="text-gray-700">{a.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
};

export default BlogComment;
