"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBlog, updateBlog, finalUpdate } from "@/redux/features/blog";
import dynamic from "next/dynamic";
import { sendBlogtoAPI, updateSpecificlog } from "@/utils/blogapi";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const WriteBlog = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state.blog);
  const { role, username } = useSelector((state: any) => state.auth);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isNew, setIsNew] = useState(true);
  let specificPost: any;

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/unauthorized");
    }
    specificPost = posts.find((post: any) => post.id === props.blogId);
    if (!specificPost) {
      dispatch(
        saveBlog({
          id: props.blogId,
          title: "",
          content: "",
          isNew: true,
          author: { username: "", role: "" },
        })
      );
      setIsNew(true);
    } else {
      setUpdatedTitle(specificPost.title || "");
      setUpdatedContent(specificPost.content || "");
      setIsNew(specificPost.isNew);
    }
  }, [props.blogId, posts]);

  const handleSaveClick = () => {
    dispatch(
      updateBlog({
        postId: props.blogId,
        updateTitle: updatedTitle,
        updatedContent: updatedContent,
        isNew: isNew,
        author: { username: specificPost?.author?.username, role: "" },
      })
    );
  };

  const handleEditorChange = (newContent: any) => {
    setUpdatedContent(newContent);
  };

  const handlePublish = async () => {
    try {
      const data = {
        title: updatedTitle,
        content: updatedContent,
      };

      let response;
      if (isNew) {
        response = await sendBlogtoAPI(data);
        if (response.success) {
          alert("Blog created successfully");
          setIsNew(false);
          dispatch(
            finalUpdate({
              postId: props.blogId,
              isNew: false,
              newId: response.blogData.blogId,
              updatedContent: response.blogData.content,
              updatedTitle: response.blogData.title,
            })
          );
          router.push(`/blog/${response.blogData.slug}`);
        }
      } else {
        response = await updateSpecificlog(
          props.blogId,
          updatedTitle,
          updatedContent
        );
        if (response.success) {
          alert("Blog updated successfully");
          setIsNew(false);
          dispatch(
            finalUpdate({
              postId: props.blogId,
              isNew: false,
              newId: response.data.id,
              updatedContent: response.data.content,
              updatedTitle: response.data.title,
            })
          );
          router.push(`/blog/${response.data.slug}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <input
          type="text"
          value={updatedTitle}
          placeholder="Insert title here"
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="border-b-0 border-black w-full text-3xl hover:border-b-2 "
        />
      </div>
      <ReactQuill
        theme="snow"
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        value={updatedContent}
        bounds="#root"
        placeholder="Write Something"
        className="w-full h-96 border-2 border-black"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={handleSaveClick} className="mt-2 border-2 border-black p-2 ">
          Update
        </button>
        <br />
        <button
          type="submit"
          className="mt-2 bg-blue-500 p-2 text-white"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default WriteBlog;
