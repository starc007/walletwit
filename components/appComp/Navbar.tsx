"use client";
import { rasters } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Button,
  DropDownButton,
  DropDownContent,
  Dropdown,
  DropdownItem,
} from "../UI";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="glass_bg px-4 border-b border-gray-50 h-16 flex items-center sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src={rasters.logo}
            alt="logo"
            width={100}
            height={100}
            className="w-7"
          />
          <span className="text-xl font-semibold">walletwit</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="special">connect wallet</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
