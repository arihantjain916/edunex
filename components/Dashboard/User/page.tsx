import { useEffect, useState } from "react";
import WriteBlog from "@/components/Blog/writeBlog";
import { useSelector } from "react-redux";
import { getBlogbyUsername } from "@/utils/blogapi";

const UserDashboard = () => {
  const { username } = useSelector((state: any) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(true);

  async function getBlogs() {
    try {
      const response = await getBlogbyUsername(username);
      if (response.data) {
        setBlogs(response.data);
        setloading(false);
      } else {
        console.log(response.response.data.error);
        setloading(false);
      }
    } catch (error) {
      console.log("An error occurred while fetching data.");
      setloading(false);
    }
  }
  useEffect(() => {
    getBlogs();
  }, [username]);
  return (
    <>
      <div>Your Blogs</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        blogs.map((blog: any) => (
          <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        ))
      )}
      <WriteBlog />
    </>
  );
};

export default UserDashboard;
