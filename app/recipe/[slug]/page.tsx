import { client } from "@/lib/sanity";
import AddToBag from "@/components/AddToList";
import ImageGallery from "@/components/ImageGallery";
import { Star } from "lucide-react";
async function getData(slug: string) {
  const query = `*[_type =="recipe" && slug.current=="${slug}"][0]{ _id, name,difficulty,time,size,steps,ingredient,background,images,"slug":slug.current,"ing":ingredient[].ingr->{name,normprice}
      }`;

  const data = await client.fetch(query);

  return data;
}

interface da {
  _id: string;
  name: string;
  difficulty: number;
  time: number;
  size: string;
  steps: string[];
  ingredient: { weight: number; ingrname: string }[];
  background: string;
  images: any;
  slug: string;
  ing: { name: string; normprice: { size: number; price: number } }[];
}

export default async function Recipe({ params }: { params: { slug: string } }) {
  const data: da = await getData(params.slug);
  let p = 0.0;
  data.ing.map(
    (i, id) =>
      (p += (i.normprice.price * data.ingredient[id].weight) / i.normprice.size)
  );
  p = p - (p % 1);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3 grid grid-cols-3 place-items-end">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
              <h3>Price: {p}</h3>
              <div className="flex gap-2.5">
                <AddToBag
                  description="cdvfv"
                  currency="USD"
                  price={p}
                  price_id={data._id}
                  image={data.images[0]}
                  name={data.name}
                  key={data._id}
                />
              </div>
            </div>

            <div className=" px-3 grid grid-rows-1 grid-cols-1 lg:grid-cols-3 ">
              <span className="px-1 ">
                <span className="  font-semibold text-gray-500 ">
                  Difficulty :{" "}
                </span>
                {[...Array(data.difficulty)].map((e, i) => (
                  <div key={e} className="inline-block align-bottom">
                    <Star />
                  </div>
                ))}
              </span>
              <span className="px-1 ">
                <span className="font-semibold text-gray-500">Portion</span>:{" "}
                {data.size}{" "}
              </span>
              <span className="px-1 ">
                <span className="font-semibold text-gray-500">
                  Expected Time
                </span>
                : {data.time} minutes
              </span>
            </div>
            <div className="my-3">
              <h3 className="pb-3 text-3xl font-semibold capitalize text-center">
                Ingedients
              </h3>
              <ol className="grid  grid-cols-2 grid-rows-3 lg:grid-cols-3 mx-3">
                {data.ingredient.map((ing, id) => (
                  <li key={id} className="italic font-medium grid grid-cols-3">
                    <div className="col-span-2">
                      {id + 1 + ". " + ing.ingrname}
                    </div>
                    <div>{ing.weight + "g"}</div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="my-3">
              <h3 className="pb-3 text-3xl font-semibold capitalize text-center">
                Backbround
              </h3>
              <p className="px-3 my-3 text-base text-gray-500 tracking-wide">
                {data.background}
              </p>
            </div>
            <div className="my-3">
              <h3 className="pb-3 text-3xl font-semibold capitalize text-center">
                Steps
              </h3>
              <ol className="grid  grid-cols-1 grid-rows-3  mx-3">
                {data.steps.map((ing, id) => (
                  <li className="font-medium py-1">{id + 1 + ". " + ing}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 10;