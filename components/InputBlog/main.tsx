"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { message } from "antd";
import { saveBlog, updateBlog, finalUpdate } from "@/redux/features/blog";
import { sendBlogtoAPI, updateSpecificlog } from "@/utils/blogapi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "./index.css";

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

const WriteBlog = ({ blogId }: { blogId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state.blog);
  const { role } = useSelector((state: any) => state.auth);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [tag, setTag] = useState("random");

  let data = new FormData();
  data.append("image", image || "");
  data.append("title", updatedTitle);
  data.append("content", updatedContent);
  data.append("tag", tag);

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/unauthorized");
    }

    const specificPost = posts.find((post: any) => post.id === blogId);
    if (!specificPost) {
      dispatch(
        saveBlog({
          id: blogId,
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
  }, [blogId, posts]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].type.includes("image")
    ) {
      setImage(event.target.files[0]);
    } else {
      message.error("Please select an image file");
    }
  };

  const handleSaveClick = () => {
    dispatch(
      updateBlog({
        postId: blogId,
        updateTitle: updatedTitle,
        updatedContent,
        isNew,
        author: { username: "", role: "" },
      })
    );
  };

  const handleEditorChange = (newContent: string) => {
    setUpdatedContent(newContent);
  };

  const handlePublish = async () => {
    try {
      let response;
      if (isNew) {
        response = await sendBlogtoAPI(data);
      } else {
        response = await updateSpecificlog(
          blogId,
          updatedTitle,
          updatedContent
        );
      }

      if (response.success) {
        const { blogData } = response;
        const { id, content, title, slug } = blogData;
        const successMessage = isNew
          ? "Blog created successfully"
          : "Blog updated successfully";

        message.success(successMessage);
        setIsNew(false);

        dispatch(
          finalUpdate({
            postId: blogId,
            isNew: false,
            newId: id,
            updatedContent: content,
            updatedTitle: title,
          })
        );
        router.push(`/blog/${slug}`);
      } else {
        message.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      message.error(error.message);
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
          className="border-b-0 border-black w-full text-3xl hover:border-b-2 focus:outline-none focus:border-b-2 focus:border-black"
        />
      </div>
      <div className="mb-5">
        <Input
          id="picture"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          required
        />
        <Select onValueChange={(value) => setTag(value)}>
          <SelectTrigger className="w-full mt-5">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="light">Technical</SelectItem>
            <SelectItem value="buisness">Buisness</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
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
        <button
          onClick={handleSaveClick}
          className="mt-2 border-2 border-black p-2 "
        >
          Update
        </button>
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
