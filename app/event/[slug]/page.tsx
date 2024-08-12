import { fullProduct } from "@/app/interface";
import { client, urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import { Url } from "url";
import Link from "next/link";
import MemberButton from "@/components/MemeberButton";
async function getData(slug: string) {
  //const s = slug === "all" ? "" : "&& slug.current=='" + slug + "'";
  const s = "&& slug.current=='" + slug + "'";
  const query = `*[_type == "event"  ${s}][0] {
        _id,name,date,
          images,
           "memberName":members[]->name,
          review,
          link,
          "mempic":members[]->image,
          
          "slug": slug.current,
          "recipe":recipeUsed[]->{name,"slug":slug.current}
          
          
      }`;

  const data = await client.fetch(query);

  return data;
}

interface eventdata {
  _id: string;
  name: string;
  date: any;
  images: any;
  memberName: string[];
  review: string;
  link: Url;
  mempic: any;
  slug: string;
  recipe: { name: string; slug: string }[];
}
export const dynamic = "force-dynamic";
export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data: eventdata = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <ImageGallery images={data.images} />
              {data.date}
              <div className="mb-0.5 inline-block text-gray-500 flex">
                {data.memberName.map((nam, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    <MemberButton
                      name={nam}
                      href={"/member/" + nam}
                      imageUrl={urlFor(data.mempic[idx]).url()}
                    />
                  </div>
                ))}
                {data.recipe.map((nam, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    <MemberButton
                      name={nam.name}
                      href={"/recipe/" + nam.slug}
                      imageUrl={urlFor(data.mempic[idx]).url()}
                    />
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
          </div>

          <p className="mt-12 text-base text-gray-500 tracking-wide">
            {data.review}
          </p>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 10;
