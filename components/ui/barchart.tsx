"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { blogAnalytics } from "../../utils/blogapi";

type Props = {};

export default function BarChart({}: Props) {
  // const data = blogAnalytics();
  const [analytics, useAnalytics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await blogAnalytics();
      useAnalytics(response.data);
    };
    fetchData();
  });
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={analytics}>
        <XAxis
          dataKey={"month"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(count: any) => `${count}`}
        />
        <Bar dataKey={"count"}/>
      </BarGraph>
    </ResponsiveContainer>
  );
}
