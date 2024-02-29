import DisplayBlog from "./components/displayBlog";
import { useRouter } from "next/navigation";
import SideNavigationBar from "../../Dashboard/components/SideNavigationBar";

const AdminDashboard = () => {
  const router = useRouter();
  const BlogId = Date.now();
  function handleClick() {
    router.push(`/blog/edit?id=${BlogId}`);
  }
  return (
    <>
      
        <SideNavigationBar />
        <div className="flex flex-col flex-1 ml-64 p-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Want to post blog??
          </button>
          <DisplayBlog />
        </div>
      
    </>
  );
};

export default AdminDashboard;
