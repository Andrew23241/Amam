import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
async function getData(input: string) {
  const query = `*[_type=="recipe"&& name match "${input}" ]{
  _id,
    name,
    "img":images[0].asset->url,
      "slug":slug.current
}`;

  const data = await client.fetch(query);

  return data;
}

interface da {
  _id: string;
  name: string;
  img: any;
  slug: string;
}

export default async function Searchpage({
  params,
}: {
  params: { input: string };
}) {
  const inp = decodeURI(params.input);
  const data: da[] = await getData(inp);
  return (
    <div className="bg-white">
      <h1> All recipe with {inp} in name</h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((recipe) => (
            <div key={recipe._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={recipe.img}
                  alt="recipe image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
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
export const revalidate = 10;
