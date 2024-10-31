import Intro from "@/components/Intro";
import Newest from "@/components/Newevents";
import NewestR from "@/components/Newrecipe";

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
