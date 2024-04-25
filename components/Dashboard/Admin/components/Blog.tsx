"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogbyUsername } from "@/utils/blogapi";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import { saveBlog } from "@/redux/features/blog";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

export interface Blog {
  id: string;
  title: string;
  content: string;
  slug: string;
}

export const DisplayBlog = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { username } = useSelector((state: any) => state.auth);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getBlogbyUsername(username);
        if (response.data) {
          setBlogs(response.data);
          response.data.forEach((blog: any) => {
            dispatch(saveBlog(blog)); // Dispatch each blog item individually
          });
        } else {
          console.log(response.response.data.error);
        }
      } catch (error) {
        console.log("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [username]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  function EditBlog(id: string) {
    router.push(`/blog/edit/?id=${id}`);
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold my-4 text-center">Your Blogs</h1>
      </div>
      {blogs.length === 0 ? (
        <div>Blog not found</div>
      ) : (
        <>
          <main className="container mx-auto mt-8">
            {blogs.map((blog) => (
              <article className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">
                  <ReactQuill
                    value={blog.content}
                    theme="snow"
                    modules={{ toolbar: false }}
                    bounds="#root"
                    readOnly={true}
                  />
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </Link>
                  <button
                    onClick={() => EditBlog(blog.id)}
                    className="text-gray-500 hover:text-gray-700 border-2 border-gray-500 hover:border-gray-700 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </main>
        </>
      )}
    </>
  );
};

export const AddBlog = () => {
  const router = useRouter();
  const BlogId = Date.now();
  function handleClick() {
    router.push(`/blog/edit?id=${BlogId}`);
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Want to post blog??
      </button>
    </>
  );
};
