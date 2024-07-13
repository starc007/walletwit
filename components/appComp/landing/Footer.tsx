import { rasters } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-5 md:px-20 px-4">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src={rasters.logo}
          alt="logo"
          width={100}
          height={100}
          className="w-7"
        />
      </Link>
      <p className="text-sm text-gray-400 mt-2">
        Made by{" "}
        <Link href="https://saura3h.xyz" className="underline text-primary">
          Saurabh
        </Link>
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="https://x.com/saurra3h"
          className="text-gray-400 hover:text-primary"
        >
          twitter
        </Link>
        <Link
          href="https://linkedin.com/in/starc007"
          className="text-gray-400 hover:text-primary"
        >
          linkedin
        </Link>
        <Link
          href="https://github.com/starc007"
          className="text-gray-400 hover:text-primary"
        >
          github
        </Link>
      </div>
    </div>
  );
};

export default Footer;
