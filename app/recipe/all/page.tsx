import Link from "next/link";
import { client } from "@/lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type=='recipe' ||_type=='newrecipe'] | order(date desc){
                 
        name,
        _type,
        "imgurl":images[0].asset->url,
          "slug":slug.current
      }`;

  const data = await client.fetch(query);

  return data;
}
interface recipedata {
  _id: string;
  name: string;
  _type: string;
  imgurl: string;

  slug: string;
}
export const dynamic = "force-dynamic";
export default async function Newest() {
  const data: recipedata[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {data.map((recipe) => (
            <div key={recipe._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/${recipe._type}/${recipe.slug}`}>
                  <Image
                    src={recipe.imgurl || "/am/download.png"}
                    alt="recipe image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/${recipe._type}/${recipe.slug}`}>
                      {recipe.name}
                    </Link>
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
export const revalidate = 10;
