"use client";
import Image from "next/image";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface d {
  imgUrl: string[];
  time: Boolean;
}

export default function ImageCarousel({ imgUrl, time }: d) {
  const [idx, setidx] = useState(0);
  if (time)
    setTimeout(() => {
      setidx((idx + 1) % imgUrl.length);
    }, 5000);
  return (
    <div className="grid grid-cols-6 items-center gap-4">
      <div>
        <Button
          variant={"secondary"}
          onClick={() => {
            idx > 0 ? setidx(idx - 1) : setidx(imgUrl.length - 1);
          }}
        >
          <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
      </div>
      <div className="col-span-4 relative">
        <div
          className="relative w-full"
          style={{
            aspectRatio: `300/300`,
          }}
        >
          <Image
            src={imgUrl[idx]}
            className="object-contain"
            alt="icon picture"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            //width={600}
            quality={100}
            priority
            //height={600}
          />
        </div>
      </div>

      <div>
        {" "}
        <Button
          variant={"secondary"}
          onClick={() => {
            setidx((idx + 1) % imgUrl.length);
          }}
        >
          <ArrowRightIcon />
        </Button>
      </div>
      {/* Optional: Add dots indicator */}
      <div className="col-span-6 flex justify-center gap-2 mt-4">
        {imgUrl.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setidx(dotIdx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === dotIdx ? "bg-black w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
