import { client } from "@/lib/sanity";
import { Star } from "lucide-react";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import Hide from "@/components/Hide";
import RecipeHeader from "@/components/RecipeHeader";

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
  "heat":preheat{upperheat,downheat,heattime},
  "imgurl":images[].asset->url}`;

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
  imgurl: string[];
}

export default async function Recipe({ params }: { params: { slug: string } }) {
  const data: da = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 ">
          {
            //<ImageGallery images={data.images} />
          }
          <ImageCarousel imgUrl={data.imgurl} time={false} />
          <div className="md:py-8">
            <RecipeHeader
              time={data.heat.heattime}
              category={data.cat}
              title={data.name}
              difficulty={data.difficulty}
              portion={data.size}
              heatdown={data.heat.downheat}
              heatup={data.heat.upperheat}
            ></RecipeHeader>

            <div>
              {false && (
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
                      <span className="font-semibold text-gray-500">
                        Portion
                      </span>
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
                        {data.heat.upperheat}/{data.heat.downheat}
                        <div>
                          <span className="font-semibold text-gray-500">
                            Heat for:
                          </span>{" "}
                          {data.heat.heattime}
                        </div>{" "}
                      </div>
                    ) : (
                      <div>Freeze for {-data.heat.heattime} hours</div>
                    )}
                  </div>
                </div>
              )}
              {false && (
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
              )}
              <div className="col-span-full md:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="columns-1 md:columns-2 lg:columns-3 gap-x-4 space-y-2">
                  {data.ingredient.map((ingredient, _) => (
                    <li key={_} className="flex justify-between">
                      <span>{ingredient.ingrname}</span>
                      <span className="text-gray-600">
                        {ingredient.weight} g
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {false && (
                <div className="my-3">
                  <h3 className="pb-3 text-3xl font-semibold capitalize text-center">
                    Backbround
                  </h3>
                  <p className="px-3 my-3 text-base text-gray-500 tracking-wide">
                    {data.background}
                  </p>
                </div>
              )}
              <div className="col-span-full md:col-span-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
                <ol className="space-y-6">
                  {data.step.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                        {index + 1}
                      </span>
                      <div>
                        <p>{step.stepText}</p>
                        {step.stepImg && (
                          <img
                            src={step.stepImg}
                            alt={`Step ${index + 1}`}
                            className="mt-2 rounded-md"
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              {false && (
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
              )}

              {data.pdf ? (
                <Hide buttonName=" Pre-typed Recipe">
                  <object className="w-full h-screen" data={data.pdf}></object>
                </Hide>
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
