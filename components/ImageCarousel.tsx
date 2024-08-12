"use client";
import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface iAppProps {
  data: { imgUrl: string }[];
}

export default function ImageCarousel({ data }: iAppProps) {
  const [idx, setidx] = useState(0);
  setTimeout(() => {
    setidx((idx + 1) % data.length);
  }, 5000);
  return (
    <div className="grid grid-cols-6 items-baseline">
      <div>
        <Button
          variant={"secondary"}
          onClick={() => {
            idx > 0 ? setidx(idx - 1) : setidx(data.length - 1);
          }}
        >
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
      </div>
      <div className="col-span-4">
        <Image
          src={data[idx].imgUrl}
          alt="icon picture"
          width={600}
          height={600}
        />
      </div>
      <div>
        {" "}
        <Button
          variant={"secondary"}
          onClick={() => {
            setidx((idx + 1) % data.length);
          }}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
