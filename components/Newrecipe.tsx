import Link from "next/link";

import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type=='recipe'][0...4] | order(_createdAt desc){
        _id,     
        name,
        "imgurl":images[0].asset->url,
        "slug":slug.current
      }`;

  const data = await client.fetch(query);

  return data;
}
interface recdata {
  _id: string;
  name: string;
  imgurl: string;

  slug: string;
}
export const dynamic = "force-dynamic";
export default async function NewestR() {
  const data: recdata[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            New Recipies
          </h2>

          <Link
            className="text-primary flex items-center gap-x-1"
            href="/recipe/all"
          >
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((recipe) => (
            <div key={recipe._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/recipe/${recipe.slug}`}>
                  <Image
                    src={recipe.imgurl}
                    alt="recipe image"
                    className="w-full max-w-lg h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
