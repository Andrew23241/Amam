import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Key } from "react";
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
  const query = "*[_type=='icon']{'imgUrl':image.asset->url}";
  const data = await client.fetch(query);
  return data;
}
export const dynamic = "force-dynamic";
export default async function Intro() {
  const data = await getdata();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex    flex-nowrap  flex-auto justify-between md:mb-16 items-center">
        <div className="mb-12  w-full md:mb-16 lg:w-1/3">
          <ImageCarousel data={data} />
        </div>
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/2 lg:pb-24 lg:pt-4">
          <h1 className="mb-4 mt-0 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            社群簡介
          </h1>
          <p className=" leading-relaxed text-gray-500 xl:text-lg">
            從文獻記載開始,甜食就存在於人類的生活中,從數千年前的壁畫中就有記載著
            人類不懼危險也要採集野生蜂蜜,到19世紀大航海時代,各國列強到各地掠奪
            各種香料,用來製糖的甘蔗也是各國的一大目標。台灣跟糖的牽絆更是相當密
            切,由於台灣氣候相當適合甘蔗生長,從日治時期,設立一家新式糖廠開始,製
            糖一直是台灣的重要產業之一,以上歷史都一再體現人類對糖的沈迷與執著。
            從前是只有貴族才能享用的高貴甜點,在現今成熟的製糖技術的幫助下變得相當
            普遍,市面上可見多到讓人眼花撩亂的甜點,不過許多商家為了盈利,會添加各
            種食品添加物來節省成本,增加食品的保存期限、口感,唯有透過自己製作的甜
            點才能撤掌握甜點的成分,讓大家在享用甜點的同時降低甜點對身體的負擔。
            然而許多甜點初學者由於不熟悉食材特性,製作技巧的情況下,時常會失敗收
            場,網路上的食譜大部份也只有寫出份量跟簡略步驟,沒有詳細注意事項,以及各步驟的詳細說明,雖然最近也有許多甜點相關線上課程推出,不過課程價格動
            輒數千,對只是做簡單甜點的人不太友善,而我們就是一群對甜點製做充滿熱誠
            的人,我們想提供一個相互學習和分享的平台。在這裡,我們將能夠分享自己的
            經驗和技巧,一起解決遇到的問題,並共同學習和成長。
          </p>
        </div>
      </div>

      <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border flex-row items-center justifier-between gap-8 border">
        {links.map((link, id) => (
          <div key={id} className="inline-block ">
            <Link
              className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
              href={link.href}
            >
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
