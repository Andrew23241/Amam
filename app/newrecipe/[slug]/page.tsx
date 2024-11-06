import { client } from "@/lib/sanity";

import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import Hide from "@/components/Hide";
import RecipeHeader from "@/components/RecipeHeader";

async function getData(slug: string) {
  const query = `*[_type =="newrecipe"  && slug.current=="${decodeURI(slug)}"][0]{ 
   _id,
   name,
   difficulty,
   
   size,
   "ingredient":ingredients[],
   background,
   images,
   "slug":slug.current,
   key,
  "steps":steps[],
  "pdf":pdf.asset->url,
  "cat":category->name,
 time,
  
 up,down,
  "imgurl":images[].asset->url}`;

  const data = await client.fetch(query);

  return data;
}

interface da {
  _id: number;
  name: string;
  difficulty: any;

  size: any;

  ingredient: {
    compname: string;
    ingr: { ingrname: string; weight: number }[];
  }[];
  background: any;
  images: any;
  slug: string;
  key: string;

  steps: { sectionname: string; step: { stepImg: any; stepDesc: any }[] }[];
  pdf: any;
  cat: any;
  time: any;

  up: any;
  down: any;
  imgurl: any[];
}

export default async function Recipe({ params }: { params: { slug: string } }) {
  const data: da = await getData(params.slug);

  return data ? (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 ">
          {data.imgurl ? (
            <ImageCarousel imgUrl={data.imgurl} time={false} />
          ) : (
            <div></div>
          )}
          <div className="md:py-8">
            <RecipeHeader
              time={data.time}
              category={data.cat}
              title={data.name}
              difficulty={data.difficulty}
              portion={data.size}
              heatdown={data.down}
              heatup={data.up}
              k={data.key}
            ></RecipeHeader>
            {data.background ? (
              <Hide buttonName="Background">
                <p className="px-3 my-3 text-base text-gray-500 tracking-wide">
                  {data.background}
                </p>
              </Hide>
            ) : (
              <div></div>
            )}
            <div>
              <div className="col-span-full md:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="columns-1 md:columns-2 lg:columns-3 gap-x-4 space-y-2">
                  {data.ingredient ? (
                    data.ingredient.map((comp, _) => (
                      <div key={_}>
                        {data.ingredient.length > 1 && (
                          <h1 className="text-1xl font-semibold mb-2">
                            {comp.compname}:
                          </h1>
                        )}
                        {comp.ingr.map((ingredient, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{ingredient.ingrname}</span>
                            <span className="text-gray-600">
                              {ingredient.weight} g
                            </span>
                          </li>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </ul>
              </div>

              <div className="col-span-full md:col-span-8 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
                <ol className="space-y-6">
                  {data.steps ? (
                    data.steps.map((s, index) => (
                      <div key={index}>
                        <div className="text-2xl font-semibold mb-4">
                          {s.sectionname}
                        </div>
                        {s.step.map((stepp, _) => (
                          <li key={_} className="flex">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                              {_ + 1}
                            </span>
                            <div>
                              <p>{stepp.stepDesc}</p>
                              {stepp.stepImg && (
                                <div className="justify-items-center">
                                  <Image
                                    src={stepp.stepImg}
                                    alt={`Step ${index + 1}`}
                                    className="mt-2 rounded-md"
                                    width={200}
                                    height={200}
                                  />
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </ol>
              </div>

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
  ) : (
    <div>data not complete or missing critical values</div>
  );
}
export const revalidate = 10;
