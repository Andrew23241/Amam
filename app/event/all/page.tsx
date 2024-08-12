import Link from "next/link";

import { client } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type=='event'] | order(date desc){
                 
        name,
        "imgurl":images[0].asset->url,
          date,"slug":slug.current
      }`;

  const data = await client.fetch(query);

  return data;
}
interface eventdata {
  _id: string;
  name: string;
  imgurl: string;

  date: any;
  slug: string;
}
export const dynamic = "force-dynamic";
export default async function Newest() {
  const data: eventdata[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((event) => (
            <div key={event._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={event.imgurl}
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
  );
}
export const revalidate = 10;
