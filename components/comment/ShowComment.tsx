import { getAllComment } from "@/utils/commentapi";
import { useEffect, useState } from "react";

export interface Comment {
  comment: string;
  publishedAt: string;
  user: {
    username: string;
  };
}

export interface Props {
  slug: string;
}

function DateFormatter(publishedAt: string) {
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateObject = new Date(publishedAt);
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date format");
  }

  const formattedDate = dateObject.toLocaleDateString("en-US", optionsDate);
  const formattedTime = dateObject.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate} at ${formattedTime}`;
}

const ShowComment = (props: Props) => {
  const [comments, setcomment] = useState([]);
  const getComment = async () => {
    try {
      const comment = await getAllComment(props.slug);
      if (comment.data) {
        const formattedData = comment.data.map((post: any) => ({
          ...post,
          publishedAt: DateFormatter(post.publishedAt),
        }));
        setcomment(formattedData);
      } else {
        console.log(comment.response.data.error);
      }
    } catch (error) {
      alert("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    getComment();
  }, [props.slug]);

  return (
    <>
      <div id="comments" className="mb-5">
        <p className="text-xl font-bold mb-2">Comments</p>
        <div id="main-comment-box" className="flex flex-col gap-5">
          {/* Comment Starts from here */}
          {comments.map((comment: Comment) => (
            <div id="comment">
              <div id="author-name and time" className="flex gap-2 text-lg">
                <div id="author-name" className="text-black">
                  {comment.user.username}
                </div>
                <div id="time" className="text-gray-600">
                  •{comment.publishedAt}
                </div>
              </div>
              <div className="mt-1">{comment.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowComment;
