"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "@/redux/features/blog";
import dynamic from "next/dynamic";
import { updateSpecificlog, getSpecificBlog } from "@/utils/blogapi";

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
  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state.blog);
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const specificPost = posts.find((post: any) => post.id === props.blogId);
    setUpdatedContent(specificPost.content || "");
  }, [props.blogId, posts]);

  const handleSaveClick = () => {
    dispatch(updateBlog({ postId: props.blogId, updatedContent }));
  };

  const handleEditorChange = (newContent: string) => {
    setUpdatedContent(newContent);
  };

  const handlePublish = async () => {
    try {
      const response = await updateSpecificlog(props.blogId, updatedContent);
      if (response.success) {
        alert("Blog Updated Successfully");
        dispatch(
          updateBlog({
            postId: props.blogId,
            updatedContent: response.data.content,
          })
        );
      }
    } catch (error) {
      console.error("Error updating specific blog:", error);
    }
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        value={updatedContent}
        bounds="#root"
        placeholder="Write Something"
      />
      <button onClick={handleSaveClick}>Update</button>
      <br />
      <button type="submit" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

export default WriteBlog;
