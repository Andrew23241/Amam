import { client, urlFor } from "@/lib/sanity";
import { Url } from "url";
import MemberButton from "@/components/MemeberButton";
import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";
import Link from "next/link";
async function getData(slug: string) {
  const s = "&& slug.current=='" + decodeURI(slug) + "'";
  const query = `*[_type == "event"  ${s}][0] {
        _id,name,date,
          "imgurl":images[].asset->url,
           "memberName":members[]->name,
          "review":review[]{context,"imgurl":pic.asset->url},
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
  imgurl: string[];
  memberName: string[];
  review: { context: string; imgurl: string }[];
  link: string;
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
              <ImageCarousel imgUrl={data.imgurl} time={false} />
              {data.date}
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>

              <div>
                <h3>Things we make: </h3>
                {data.recipe ? (
                  data.recipe.map((nam, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 inline-block"
                    >
                      <MemberButton
                        name={nam.name}
                        href={"/recipe/" + nam.slug}
                        imageUrl={urlFor(data.mempic[idx]).url()}
                      />
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
              {data.link && <Link href={data.link}>{data.link}</Link>}
            </div>
          </div>

          <p className="mt-6 text-base text-gray-500 tracking-wide">
            {data.review &&
              data.review.map((par, _) => (
                <div key={_}>
                  <p>{par.context}</p>
                  {par.imgurl && (
                    <div className="justify-items-center">
                      <Image
                        src={par.imgurl}
                        alt="pic"
                        width={300}
                        height={300}
                      />
                    </div>
                  )}
                </div>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 10;
