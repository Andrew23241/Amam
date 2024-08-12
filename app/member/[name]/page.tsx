import { client, urlFor } from "@/lib/sanity";
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
  const data: eventdata = await getData(params.name);

  return (
    <div className="bg-white">
      <span>
        <h1>{data.name}</h1>
      </span>
      <div>
        <h3>{data.intro}</h3>
      </div>
      <div>
        <Image
          src={data.imgurl}
          width={500}
          height={500}
          alt="memberpic"
        ></Image>
      </div>
    </div>
  );
}
export const revalidate = 10;
