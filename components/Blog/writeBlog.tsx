"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "@/redux/features/blog";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css";
import { updateSpecificlog } from "@/utils/blogapi";

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
  const [textBoxValue, setTextBoxValue] = useState("");
  const [savedContent, setSavedContent] = useState<any>(null);

  useEffect(() => {
    const specificPost = posts.find((post: any) => post.id === props.blogId);
    setSavedContent(specificPost);
    setTextBoxValue(specificPost?.content || "");
  }, [posts, props.blogId]);

  const handleSaveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(
      updateBlog({ postId: props.blogId, updatedContent: textBoxValue })
    );
  };

  const handleEditorChange = (newContent: string) => {
    setTextBoxValue(newContent);
  };

  const handleSave = async() => {
    console.log(textBoxValue);
    console.log(props.blogId);
    const data = {
      content: textBoxValue
    }
    const response = await updateSpecificlog(props.blogId, textBoxValue);
    console.log(response.success);
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        value={textBoxValue}
        bounds="#root"
        placeholder="Write Something"
      />

      <button onClick={handleSaveClick}>Update</button>
      <br />
      <button type="submit" onClick={handleSave}>
        Publish
      </button>
    </div>
  );
};

export default WriteBlog;
