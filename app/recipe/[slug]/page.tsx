import { client } from "@/lib/sanity";
import AddToBag from "@/components/AddToList";
import ImageGallery from "@/components/ImageGallery";
import { Star } from "lucide-react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type =="recipe" && slug.current=="${slug}"][0]{ 
  _id,
   name,
   difficulty,
   
   size,
   ingredient,
   background,
   images,
   "slug":slug.current,
   "ing":ingredient[].ingr->{name},
  "step":steps[]{
        "stepImg":stepImg.asset->url,
        "stepText":stepDesc},
  "pdf":pdf.asset->url,
  "cat":category->name,
  makingtime,
  key,
  "heat":preheat{upperheat,downheat,heattime}}`;

  const data = await client.fetch(query);

  return data;
}

interface da {
  _id: string;
  name: string;
  difficulty: number;

  size: string;

  ingredient: { weight: number; ingrname: string }[];
  background: string;
  images: any;
  slug: string;
  ing: { name: string }[];
  step: { stepImg: any; stepText: string }[];
  pdf: any;
  cat: string;
  makingtime: number;
  key: string;
  heat: { upperheat: number; downheat: number; heattime: number };
}

export default async function Recipe({ params }: { params: { slug: string } }) {
  const data: da = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 ">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3 flex justify-between place-items-end">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div>
              <div className="flex">
                <div className=" mx-3  grid grid-rows-2 grid-cols-2 lg:w-2/3">
                  <span className="mx-1 ">
                    <span className="  font-semibold text-gray-500 ">
                      Difficulty :{" "}
                    </span>
                    {[...Array(data.difficulty)].map((e, i) => (
                      <div key={e} className="inline-block align-bottom">
                        <Star />
                      </div>
                    ))}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-500">Key:</span>{" "}
                    {data.key}
                  </div>
                  <span className="mx-1 ">
                    <span className="font-semibold text-gray-500">Portion</span>
                    : {data.size}{" "}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-500">
                      Category:
                    </span>{" "}
                    {data.cat}
                  </div>
                </div>
                <div className="border px-2 py-2 mx-2 my-2 ">
                  {data.heat.heattime > 0 ? (
                    <div>
                      <div>
                        <span className="font-semibold text-gray-500">
                          Upper Heat:
                        </span>{" "}
                        {data.heat.upperheat}
                      </div>{" "}
                      <div>
                        <span className="font-semibold text-gray-500">
                          Lowwer Heat:
                        </span>{" "}
                        {data.heat.downheat}
                      </div>{" "}
                      <div>
                        <span className="font-semibold text-gray-500">
                          Heat Time:
                        </span>{" "}
                        {data.heat.heattime}
                      </div>{" "}
                    </div>
                  ) : (
                    <div>Freeze for {-data.heat.heattime} hours</div>
                  )}
                </div>
              </div>
              <div className="my-3">
                <h3 className="pb-3 text-3xl font-semibold capitalize text-center">
                  Ingedients
                </h3>
                <ol className="grid  grid-cols-2 grid-rows-3 lg:grid-cols-3 mx-3">
                  {data.ingredient.map((ing, id) => (
                    <li
                      key={id}
                      className="italic font-medium grid grid-cols-3"
                    >
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
                {data.step ? (
                  <ol className="grid  grid-cols-1 grid-rows-3  mx-3">
                    {data.step.map((ing, id) => (
                      <li key={id} className="font-medium py-1 ">
                        {id + 1 + ". " + ing.stepText}
                        {ing.stepImg ? (
                          <div className="grid place-items-center my-3">
                            <Image
                              src={ing.stepImg}
                              width={200}
                              height={200}
                              alt="demo"
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <h3>no steps or file uploaded yet</h3>
                )}
              </div>
              {data.pdf ? (
                <div>
                  <object className="w-full h-screen" data={data.pdf}></object>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 10;
