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

export interface Blog {
  id: string;
  title: string;
  content: string;
}

export const DisplayBlog = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { username } = useSelector((state: any) => state.auth);
  const [blogs, setBlogs] = useState([]);
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
      <div>Your Blogs</div>
      {blogs.length === 0 ? (
        <div>Blog not found</div>
      ) : (
        blogs.map((blog: Blog) => (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
            <ReactQuill
              value={blog.content}
              theme="snow"
              modules={{ toolbar: false }}
              bounds="#root"
              readOnly={true}
            />
            <button onClick={() => EditBlog(blog.id)}>Edit</button>
          </div>
        ))
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

