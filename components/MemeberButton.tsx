"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export interface buttondata {
  name: string;
  href: string;
  imageUrl: string;
}

export default function MemberButton({ name, href, imageUrl }: buttondata) {
  return (
    <Button variant={"default"}>
      <Link href={href}>
        <span className="inline-block align-baseline">
          <h3 className="text-lg font-semibold text-gray-700"> {name}</h3>
        </span>
      </Link>
    </Button>
  );
}
