"use client";
import { useState, useEffect } from "react";
import { getAllBlogData } from "../../utils/blogapi";

export default function Blog() {
  interface Blog {
    content: string;
    tag: string;
    publishedAt: string;
    id: string;
    title: string;
    slug: string;
    author: {
      username: string;
      role: string;
      href: string;
      imageUrl: string;
    };
  }

  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const apidata = await getAllBlogData();
      if (apidata.data) {
        const formattedData = apidata.data.map((post: any) => ({
          ...post,
          publishedAt: new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));
        setBlog(formattedData);
      }
      else {
        return (
          <>
            <h1>{apidata.response.data.error}</h1>
          </>
        );
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blog.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.publishedAt} className="text-gray-500">
                  {post.publishedAt}
                </time>
                <a
                  href={post.tag}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.tag}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.slug}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.content}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                  alt="profile-image"
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.author.username}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
