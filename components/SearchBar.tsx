"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { ChangeEvent, useState } from "react";
import Searchpage from "@/app/Search/[input]/page";
export type SearchProps = {
  onSearch: (value: string) => void;
};

function SearchBar(props: SearchProps) {
  const [search, setsearch] = useState("Search for recipe ....");
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setsearch(target.value);
  };

  const { onSearch } = props;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(search);
    }
  };
  return (
    <div className="flex items-end">
      <input
        name="serach"
        placeholder={search}
        onChange={searchHandler}
        onKeyDown={handleKeyDown}
        className="h-10 px-5 pr-10  border rounded-full text-sm focus:outline-none"
      ></input>
      <Link href={"/Search/" + search}>
        <Button className="bg-white">
          <Search></Search>
        </Button>
      </Link>
    </div>
  );
}

export default SearchBar;
