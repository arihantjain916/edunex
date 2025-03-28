"use client";

import PageTitle from "@/components/ui/pagetitle";
import { MessageCircle, Rss } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/ui/card";
import BarChart from "@/components/ui/barchart";
import SalesCard from "@/components/ui/salescard";
import { getAllCommentofUser } from "@/utils/commentapi";
import { useEffect, useState } from "react";
import { getBlogbyUsername } from "@/utils/blogapi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { saveBlog } from "@/redux/features/blog";
import { message } from "antd";

export type commentData = {
  message: string;
  data: commentType[];
  success: boolean;
  totalComment: number;
};

export type commentType = {
  comment: string;
  publishedAt: string;
};
export default function Home() {
  const { posts } = useSelector((state: RootState) => state.blog);
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [commentData, usecommentData] = useState<commentData>();
  useEffect(() => {
    const getComment = async () => {
      const data = await getAllCommentofUser();
      usecommentData(data);
    };

    getComment();
  }, []);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getBlogbyUsername(username);
        if (response.data) {
          response.data.forEach((blog: any) => {
            dispatch(saveBlog(blog));
          });
        } else {
          message.error(response.response.data.error);
        }
      } catch (error) {
        message.error("An error occurred while fetching data.");
      }
    };

    getBlogs();
  }, [username]);

  const formattedDate = (dateI: string) => {
    var date = new Date(dateI);

    var day: string | number = date.getDate();
    var month: string | number = date.getMonth() + 1;
    var year: string | number = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    var shortYear = year.toString().slice(-2);
    var formattedDate = day + "/" + month + "/" + shortYear;

    return formattedDate;
  };

  const cardData: CardProps[] = [
    {
      label: "Total Comment",
      comment: commentData?.totalComment?.toString() || "0",
      icon: MessageCircle,
    },
    {
      label: "Total Blog Posted",
      comment: posts?.length?.toString() || "0",
      icon: Rss,
    },
  ];

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData?.map((d, i) => (
          <Card
            key={i}
            comment={d.comment}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Comments</p>
            <p className="text-sm text-gray-400">
              {`You post total ${commentData?.totalComment || "0"} comment.`}
            </p>
          </section>
          {commentData?.data?.map((d: any, i: any) => (
            <SalesCard
              key={i}
              comment={d.comment}
              publishedAt={formattedDate(d.publishedAt)}
              blog={d.blog.title}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
