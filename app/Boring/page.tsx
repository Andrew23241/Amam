import Link from "next/link";

import { client } from "@/lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type =="ingredients"]{name,descr,
  "var":varients[]->{name,describe,"imgurl":image.asset->url}
  
  }`;
  const data = await client.fetch(query);

  return data;
}

interface d {
  name: string;
  descr: string;
  var: {
    name: string;

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
        <ol className="grid lg:grid-cols-2 mx-3 my-3 ">
          {data.map((topic, id) => (
            <li key={id} className="my-2 mx-2 ">
              <h2 className="font-bold text-3xl">{topic.name}</h2>
              <p className="italic  my-1 mx-1 font-sans">{topic.descr}</p>
              <ol className="grid grid-cols-2">
                {topic.var ? (
                  topic.var.map((d, _) => (
                    <li key={_}>
                      <h5 className="font-semibold text-gray-500 text-2xl">
                        {d.name}
                      </h5>

                      <div className="flex flex-wrap">
                        <div className="my-2  mx-3 ">
                          <Image
                            src={d.imgurl}
                            width={300}
                            height={300}
                            alt="varpic"
                          />
                        </div>
                        <p className="my-2  mx-3 ">{d.describe} </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <div></div>
                )}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export const revalidate = 10;
