import React from "react";

const CommentPage = ({ pageSlug }: any) => {
  return (
    <>
      <div id="comments" className="mb-5">
        <p className="text-xl font-bold mb-2">Comments</p>
        <div id="main-comment-box" className="flex flex-col gap-5">
          <div id="comment">
            <div id="author-name and time" className="flex gap-2 text-lg">
              <div id="author-name" className="text-black">
                Author-Name
              </div>
              <div id="time" className="text-gray-600">
                •February 24, 2024 at 09:48:00 PM
              </div>
            </div>
            <div className="mt-1">Comment hai ye</div>
          </div>
          <div id="comment">
            <div id="author-name and time" className="flex gap-2 text-lg">
              <div id="author-name" className="text-black">
                Author-Name
              </div>
              <div id="time" className="text-gray-600">
                •February 24, 2024 at 09:48:00 PM
              </div>
            </div>
            <div>Comment hai ye</div>
          </div>
          <div id="comment">
            <div id="author-name and time" className="flex gap-2 text-lg">
              <div id="author-name" className="text-black">
                Author-Name
              </div>
              <div id="time" className="text-gray-600">
                •February 24, 2024 at 09:48:00 PM
              </div>
            </div>
            <div>Comment hai ye</div>
          </div>
        </div>
      </div>
      <div id="comment-post">
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write a comment"
          className=" border-b-2 border-indigo-500 outline-none w-full text-xl"
        />
        <button className="mt-4 border border-gray-600 bg-gray-600 text-white rounded-lg px-4 py-2">
          PUBLISH
        </button>
      </div>
    </>
  );
};

export default CommentPage;
