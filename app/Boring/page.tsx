import Link from "next/link";

import { client } from "@/lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type =="ingredients"]{name,descr,
  "var":varients[]->{name,price,describe,"imgurl":image.asset->url}
  
  }`;
  const data = await client.fetch(query);

  return data;
}

interface d {
  name: string;
  descr: string;
  var: {
    name: string;
    price: { unitprice: number; minunit: number };
    describe: string;
    imgurl: string;
  }[];
}
export const dynamic = "force-dynamic";
export default async function Amamamam() {
  const data: d[] = await getData();

  return (
    <div className="bg-white px-5 py-5">
      <div className=" mx-2 my-4">
        <ol className="grid grid-cols-2 mx-3 my-3 px-6 py-3">
          {data.map((topic, id) => (
            <li key={id} className="py-2 px-2 ">
              <h2 className="font-bold text-3xl">{topic.name}</h2>
              <p className="italic py-1 px-1 my-1 mx-1 font-sans">
                {topic.descr}
              </p>
              <ol className="grid grid-cols-2">
                {topic.var.map((d, _) => (
                  <li key={_}>
                    <h5 className="font-semibold text-gray-500 text-2xl">
                      {d.name}
                    </h5>
                    <span className="mr-5">
                      最小單位:{d.price.minunit} {"  "}克
                    </span>
                    <span>售價 : {d.price.unitprice}</span>
                    <div className="grid grid-cols-2">
                      <div className="my-2 py-3">
                        <Image
                          src={d.imgurl}
                          width={300}
                          height={300}
                          alt="varpic"
                        />
                      </div>
                      <p>{d.describe} </p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export const revalidate = 10;
