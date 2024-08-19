import { client } from "@/lib/sanity";

import Link from "next/link";

import * as React from "react";

import ImageCarousel from "./ImageCarousel";
const links = [
  { name: "社課", href: "/Current" },
  { name: "阿姆阿姆", href: "/Amamamam" },
  { name: "商品預購", href: "/Sell" },
  { name: "服務學習", href: "/Service" },
  { name: "西點概論", href: "/Boring" },
];
async function getdata() {
  const query =
    "*[_type=='home'][0]{  intro,  'imgUrl':images[].asset->url    }";
  const data = await client.fetch(query);
  return data;
}
interface d {
  intro: string;
  imgUrl: string[];
}
export const dynamic = "force-dynamic";
export default async function Intro() {
  const data: d = await getdata();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex   flex-wrap  flex-auto justify-between md:mb-16 items-center">
        <div className="mb-12  w-full md:mb-16 lg:w-1/3">
          <ImageCarousel imgUrl={data.imgUrl} />
        </div>
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/2 lg:pb-24 lg:pt-4">
          <h1 className="mb-4 mt-0 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            社群簡介
          </h1>
          <p className=" leading-relaxed text-gray-500 xl:text-lg">
            {data.intro}
          </p>
        </div>
      </div>
      <div className="flex flex-col  items-center justify-between gap-8 md:flex-row">
        <div className="flex  h-12 w-96 divide-x overflow-hidden rounded-lg border ">
          {links.map((link, id) => (
            <Link
              key={id}
              className="flex w-1/5 items-center justify-center text-base text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
