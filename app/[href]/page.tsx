import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "@/lib/sanity";
import Image from "next/image";

async function getData(cateogry: string) {
  const query = `*[_type=='event' && eventcategory->urlname=="${cateogry}" ]{
  _id,name,date,"image":images[0].asset->url,"slug":slug.current
}`;
  const data = await client.fetch(query);

  return data;
}

interface d {
  _id: string;
  name: string;

  date: any;
  image: any;
  slug: string;
}
export const dynamic = "force-dynamic";
export default async function Amamamam({
  params,
}: {
  params: { href: string };
}) {
  const data: d[] = await getData(params.href);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Our Products for {params.href}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((event) => (
              <div key={event._id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={event.image}
                    alt="event image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/event/${event.slug}`}>{event.name}</Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 10;
