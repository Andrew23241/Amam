"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { CakeSliceIcon } from "lucide-react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
const links = [
  { name: "社課", href: "/Current" },
  { name: "阿姆阿姆", href: "/Amamamam" },
  { name: "商品預購", href: "/Sell" },
  { name: "服務學習", href: "/Service" },
  { name: "西點概論", href: "/Boring" },
];

export default function Example() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  return (
    <header className="mb-4 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/">
            <h1 className="  text-2xl md:text-4xl font-bold">
              AM<span className="text-primary">AM</span>
            </h1>
          </Link>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {links.map((link, idx) => (
              <div>
                <MenuItem key={idx}>
                  {pathname === link.href ? (
                    <Link
                      className="text-lg font-semibold text-primary"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  )}
                </MenuItem>
              </div>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
