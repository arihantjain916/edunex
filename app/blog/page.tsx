import Blog from "../../components/Blog/blog";
import { Header } from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

import { Seo } from "@/components/Seo";

export default function BlogPage() {
  return (
    <>
      <Seo title="Blog" description="Blogs to increase your skills.." />
      <Header />
      <Blog />
      <Footer />
    </>
  );
}
