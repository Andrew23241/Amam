import ImageCarousel from "@/components/ImageCarousel";
import Intro from "@/components/Intro";
import { client, urlFor } from "@/lib/sanity";
import Navbar from "@/components/Navbar";
import Newest from "@/components/Newevents";
import NewestR from "@/components/Newrecipe";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Intro></Intro>
      <Newest></Newest>
      <NewestR></NewestR>
    </div>
  );
}
export const revalidate = 10;
