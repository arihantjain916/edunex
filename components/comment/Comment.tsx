import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowComment from "./ShowComment";
import CommentPost from "./CommentPost";

const CommentPage = ({ pageSlug }: any) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <ShowComment slug={pageSlug} />
      <CommentPost slug={pageSlug} isAuth={isAuthenticated} />
    </>
  );
};

export default CommentPage;
