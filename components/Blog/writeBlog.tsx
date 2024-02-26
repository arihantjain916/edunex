"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBlog } from "@/redux/features/blog";

const WriteBlog = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state: any) => state.blog);

  console.log(posts);

  const [textBoxValue, setTextBoxValue] = useState("");
  // const [savedContent, setSavedContent] = useState("");

  const handleSaveClick = () => {
    const id = Date.now();
    dispatch(saveBlog({ id, textBoxValue }));
  };

  const handleChange = (event: any) => {
    setTextBoxValue(event.target.value);
  };

  return (
    <div>
      <textarea value={textBoxValue} onChange={handleChange} />
      <button onClick={handleSaveClick}>Save</button>
      <div>
        <h2>Saved Content:</h2>
        <p>
          {posts.map((post: any) => (
            <h1>{post.textBoxValue}</h1>
          ))}
        </p>
      </div>
    </div>
  );
};

export default WriteBlog;
