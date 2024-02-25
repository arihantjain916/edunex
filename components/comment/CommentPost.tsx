import { sendDataToCommentApi } from "@/utils/commentapi";
import { useState } from "react";

interface Props {
  slug: string;
  isAuth: boolean;
}

const CommentPost = ({ slug, isAuth }: Props) => {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiData = await sendDataToCommentApi(slug, commentInput);
    if (apiData.success) {
      setCommentInput("");
    } else {
      alert(apiData.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div id="comment-post">
      <input
        type="text"
        name="comment"
        id="comment"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Write a comment"
        className="border-b-2 border-indigo-500 outline-none w-full text-xl"
        disabled={!isAuth}
      />
      {!isAuth && <p>You must be logged in to comment</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 border border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-2"
        disabled={!isAuth}
      >
        PUBLISH
      </button>
    </div>
  );
};

export default CommentPost;
