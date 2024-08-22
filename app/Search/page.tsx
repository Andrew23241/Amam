import IngSelector from "@/components/IngSelector";

import { client } from "@/lib/sanity";

import React from "react";

async function getData() {
  const query = `*[_type=="ingredients" || _type=="varients" ]{
    
      name,
      
          }`;

  const data = await client.fetch(query);

  return data;
}

export interface da {
  name: string;
}

async function Advance() {
  const data: da[] = await getData();

  return (
    <div className="flex flex-col items-center w-full">
      <IngSelector names={data}></IngSelector>
    </div>
  );
}

export default Advance;
