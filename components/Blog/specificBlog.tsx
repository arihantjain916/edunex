"use client";

import { useState, useEffect } from "react";
import { getSpecificBlog } from "../../utils/blogapi";

const SpecificBlog = (props: any) => {
  interface Blog {
    title: string;
    content: string;
    tag: string;
    publishedAt: string;
    id: string;
    author: {
      username: string;
      role: string;
      imageUrl: string;
    };
  }
  const [apidata, setApiData] = useState<Blog>();
  async function fetchData() {
    const response: any = await getSpecificBlog(props.slug);
    if(response.data){
      setApiData(response.data);
    }
    else{
      setApiData(response.response.data.error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div>Specific Blog</div>
      <div>{apidata?.title}</div>
    </>
  );
};

export default SpecificBlog;
