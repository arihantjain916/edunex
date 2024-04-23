"use client";

import PageTitle from "@/components/ui/pagetitle";
import { MessageCircle, Rss } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/ui/card";
import BarChart from "@/components/ui/barchart";
import SalesCard, { SalesProps } from "@/components/ui/salescard";
import { getAllCommentofUser } from "@/utils/commentapi";
import { useEffect, useState } from "react";

const cardData: CardProps[] = [
  {
    label: "Total Comment",
    comment: "10",
    discription: "+20.1% from last month",
    icon: MessageCircle,
  },
  {
    label: "Total Blog Posted",
    comment: "10",
    discription: "+20.1% from last month",
    icon: Rss,
  },
];

// const uesrSalesData: SalesProps[] = [
//   {
//     name: "Olivia Martin",
//     email: "olivia.martin@email.com",
//     saleAmount: "+$1,999.00"
//   },
//   {
//     name: "Jackson Lee",
//     email: "isabella.nguyen@email.com",
//     saleAmount: "+$1,999.00"
//   },
//   {
//     name: "Isabella Nguyen",
//     email: "isabella.nguyen@email.com",
//     saleAmount: "+$39.00"
//   },
//   {
//     name: "William Kim",
//     email: "will@email.com",
//     saleAmount: "+$299.00"
//   },
//   {
//     name: "Sofia Davis",
//     email: "sofia.davis@email.com",
//     saleAmount: "+$39.00"
//   }
// ];

export type commentData = {
  message: string;
  data: {
    comment: string;
    publishedAt: string;
  };
  success: boolean;
  totalComment: number;
};

export type commentType = {
  comment: string;
  publishedAt: string;
};
export default function Home() {
  const [commentData, usecommentData] = useState<commentData>();
  useEffect(() => {
    const getComment = async () => {
      const data = await getAllCommentofUser();
      usecommentData(data);
    };

    getComment();
  }, []);

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

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
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
              {`You made ${commentData?.totalComment} sales this month.`}
            </p>
          </section>
          {commentData?.data?.map((d: any, i: any) => (
            <SalesCard
              key={i}
              comment={d.comment}
              publishedAt={formattedDate(d.publishedAt)}
            />
          ))}
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
