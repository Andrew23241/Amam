"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { Heading, LucidePersonStanding, PersonStanding } from "lucide-react";

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
