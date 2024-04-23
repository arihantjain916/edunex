/* eslint-disable @next/next/no-img-element */
/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */

import React from "react";

export type SalesProps = {
  comment: string;
  publishedAt: string;
};

export default function SalesCard(props: SalesProps) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className="text-sm">
            <p>{props.comment}</p>
           
        </div>
      </section>
        <p>{props.publishedAt}</p>
    </div>
  );
}