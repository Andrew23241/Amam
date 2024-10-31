import { client } from "@/lib/sanity";
import Image from "next/image";
async function getData(name: string) {
  const query = `*[_type=="person" && name=="${name}"][0]{
  name,"imgurl":image.asset->url , intro
}`;

  const data = await client.fetch(query);

  return data;
}

interface eventdata {
  name: string;
  imgurl: string;
  intro: string;
}
export const dynamic = "force-dynamic";
export default async function ProductPge({
  params,
}: {
  params: { name: string };
}) {
  const data: eventdata = await getData(decodeURI(params.name));

  return (
    <div className="bg-white">
      <Image
        src={data.imgurl}
        width={400}
        height={400}
        alt="memberpic"
        className="item-center mx-2 my-2 px-1 py-2"
      ></Image>
      <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl">
        {data.name}
      </h1>

      <p className="mt-6 text-base text-gray-500 tracking-wide">{data.intro}</p>
    </div>
  );
}
export const revalidate = 10;
