import DisplayBlog from "./components/displayBlog";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const router = useRouter();
  const BlogId = Date.now();
  function handleClick() {
    router.push(`/blog/edit?id=${BlogId}`);
  }
  return (
    <>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Want to post blog??
      </button>
      <DisplayBlog />
    </>
  );
};

export default AdminDashboard;
