import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
async function getData(input: string) {
  const query =
    input +
    ']{  _id,    name,    "img":images[0].asset->url,      "slug":slug.current}';

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
  const na = inp.split("_")[0];
  const want = inp.split("_");
  const unwant = inp.split("-");
  let fetch = '*[_type=="recipe"&& name match"' + na + '"';
  if (want.length >= 3) {
    want.map(
      (n, i) =>
        (fetch +=
          i > 0 && i < want.length - 1
            ? ' && references(*[(_type=="varient" || _type=="ingredients")&& name=="' +
              n +
              '" ]._id)'
            : "")
    );
  }
  if (unwant.length >= 2) {
    unwant.map(
      (n, i) =>
        (fetch +=
          i > 0
            ? '&& !references(*[(_type=="varient" || _type=="ingredients")&& name=="' +
              n +
              '" ]._id)'
            : "")
    );
  }

  const data: da[] = await getData(fetch);

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center w-full">
        <h1 className="my-1"> All recipe with {na} in name</h1>
        <h1 className="my-1">
          Wanted : {want.length < 3 ? "none" : ""}
          {want.map((n, i) => (i > 0 && i < want.length - 1 ? n + "," : ""))}
        </h1>
        <h1 className="my-1">
          un-Wanted:{unwant.length < 2 ? "none" : ""}
          {unwant.map((n, i) => (i > 0 ? n + "," : ""))}
        </h1>
        <h1> Total {data.length} recipies satisfy </h1>
        <div>
          <Link href={"/Search"}>
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>

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
