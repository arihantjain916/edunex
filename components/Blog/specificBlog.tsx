"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { getSpecificBlog } from "../../utils/blogapi";
import "./blog.css";
import CommentPage from "../comment/Comment";
import Loading from "../loader/Loader";
import { AuthorDetails } from "../Extra-Page/AuthorDetails";
import { Seo } from "../Seo";

function formattedDate(date: any) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
const SpecificBlog = ({ slug }: any) => {
  interface Blog {
    title: string;
    content: string;
    publishedAt: string;
    slug: string;
    image: string;
    author: {
      username: string;
      role: string;
      imageUrl: string;
      email: string;
    };
  }
  const [apidata, setApiData] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const response: any = await getSpecificBlog(slug);
    if (response.data) {
      setApiData(response.data);
      setLoading(false);
    } else {
      setApiData(response.response.data.error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Seo
        title={apidata?.title!}
        description={apidata?.content.slice(0, 400)!}
      />
      <div>
        <div id="page-body" className="max-w-[1280px] my-0 mx-auto">
          <div id="center" className="w-full">
            <main>
              <div className="title font-mono text-white">
                <p className="ml-4 mb-4 text-3xl font-serif capitalize">
                  {apidata?.title}
                </p>
              </div>
              <div className="ml-4 mt-4 text-base font-serif">
                {formattedDate(apidata?.publishedAt)}
              </div>
              <div className="content">
                <div className="main-content">
                  <p>{apidata?.content}</p>
                </div>
                {apidata?.image && (
                  <Image
                    src={apidata?.image}
                    alt="blog image"
                    width={800}
                    height={20}
                    className="mx-auto mb-1"
                  />
                )}
                <div className="main-content">
                  <p>{apidata?.content}</p>
                </div>
                <div className="mb-4">
                  <AuthorDetails
                    name={apidata?.author?.username!}
                    username={apidata?.author?.username!}
                    role={apidata?.author?.role!}
                  />
                </div>
                <CommentPage pageSlug={apidata?.slug} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificBlog;
