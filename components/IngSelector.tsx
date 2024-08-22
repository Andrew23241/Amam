"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Button } from "@/components/ui/button";
export type IngList = {
  names: { name: string }[];
};
function IngSelector(props: IngList) {
  const { names } = props;
  const emp: string[] = [];
  const [want, setwant] = useState(emp);
  const [unwant, setunwant] = useState(emp);
  const initial = "Search for recipe ....";
  const [search, setsearch] = useState(initial);
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    target.value === "" ? setsearch(initial) : setsearch(target.value);
  };
  return (
    <div>
      {/*SearchBar */}
      <div>
        <input
          name="serach"
          placeholder={search}
          onChange={searchHandler}
          className="h-10 px-5 pr-10  border rounded-full text-sm focus:outline-none"
        ></input>
      </div>
      <h1>Ingredients</h1>
      {/*wanted items */}
      <div className="flex justify-items-start w-full">
        <div className="flex items-center">
          <span>Wanted :</span>
          {want.map((n, i) =>
            n.length ? (
              <h3
                key={i}
                className="bg-primary flex mx-1 border rounded-md pl-1 py-1"
              >
                {n}
                <button
                  className="mx-1 hover:text-blue"
                  onClick={() => {
                    const arr = want.filter((_, x) => x !== i);
                    setwant(arr);
                  }}
                >
                  x
                </button>
              </h3>
            ) : (
              <div key={i}></div>
            )
          )}
        </div>
        <Menu as="div" className="relative inline-block text-center">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              +
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {names.map((d, i) =>
                want.includes(d.name) ? (
                  <div key={i}></div>
                ) : (
                  <MenuItem key={i}>
                    <div>
                      <button
                        onClick={() => {
                          setwant([...want, d.name]);
                        }}
                      >
                        {d.name}
                      </button>
                    </div>
                  </MenuItem>
                )
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>
      {/*unwanted items */}
      <div className="flex">
        <div className="flex items-center">
          <span>un-Wanted :</span>
          {unwant.map((n, i) =>
            n.length ? (
              <h3 key={i} className="inline-block mx-1 border rounded-md pl-1">
                {n}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="bg-white "
                  onClick={() => {
                    const arr = unwant.filter((_, x) => x !== i);
                    setunwant(arr);
                  }}
                >
                  X
                </Button>
              </h3>
            ) : (
              <div key={i}></div>
            )
          )}
        </div>
        <Menu as="div" className="relative inline-block text-center">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              +
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {names.map((d, i) =>
                want.includes(d.name) ? (
                  <div key={i}></div>
                ) : (
                  <MenuItem key={i}>
                    <div>
                      <button
                        onClick={() => {
                          setunwant([...unwant, d.name]);
                        }}
                      >
                        {d.name}
                      </button>
                    </div>
                  </MenuItem>
                )
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>
      {/*Search submmit */}
      <div>
        <Link
          href={
            "/Search/" +
            search +
            want.map((w, _) => "_" + w) +
            "_" +
            unwant.map((w, _) => "-" + w)
          }
        >
          <Button variant="destructive">Search</Button>
        </Link>
      </div>
    </div>
  );
}

export default IngSelector;
