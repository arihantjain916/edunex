"use client";

import { useState, useEffect } from "react";
import { getAllBlogData } from "../../utils/blogapi";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css";
import { Skeleton } from "@/components/ui/skeleton";
import "./blog.css";

interface BlogPost {
  content: string;
  tag: string;
  publishedAt: string;
  id: string;
  title: string;
  slug: string;
  image: string;
  author: {
    username: string;
    role: string;
    href: string;
    imageUrl: string;
  };
}

export default function Blog() {
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apidata = await getAllBlogData();
        if (apidata.data) {
          const formattedData = apidata.data.map((post: any) => ({
            ...post,
            publishedAt: new Date(post.publishedAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            ),
          }));
          setBlog(formattedData);
          setLoading(false);
        } else {
          setError(apidata.response.data.error);
          setLoading(false);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Increase your skills with the blogs from the expert...
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col space-y-3">
                <div className="space-y-2">
                  <Skeleton className="border rounded-lg overflow-hidden shadow-md bg-white" />
                  <Skeleton className="w-full h-48" />
                  <Skeleton className="h-4 w-[50px]" />
                  <Skeleton className="h-5 w-[55px]" />
                  <Skeleton className="h-10 w-[300px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (blog.length === 0) {
    return (
      <>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Increase your skills with the blogs from the expert...
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <p>No blog post found</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Increase your skills with the blogs from the expert...
          </p>
        </div>
        <div className="mx-auto mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl">
          {blog.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <img
                className="w-full h-48 object-cover object-center"
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={post.title}
              />
              <div className="p-6">
                <a
                  href={`/blog?tag=${post.tag}`}
                  className="text-sm font-medium text-indigo-600"
                >
                  {post.tag}
                </a>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h2>
                <ReactQuill
                  value={post.content}
                  theme="snow"
                  modules={{ toolbar: false }}
                  bounds="#root"
                  readOnly={true}
                />

                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={`blog/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
