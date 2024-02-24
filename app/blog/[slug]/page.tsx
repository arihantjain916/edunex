"use client";
import SpecificBlog from "../../../components/Blog/specificBlog";
import { Header } from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";

export default function Blog({ params }: any) {
  return (
    <>
      <Header />
      <div className="mt-10">
        <SpecificBlog slug={params.slug} />
      </div>
      <Footer />
    </>
  );
}
