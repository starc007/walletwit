"use client";
import { rasters } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useWallet, UnifiedWalletButton } from "@jup-ag/wallet-adapter";

import {
  Button,
  DropDownButton,
  DropDownContent,
  Dropdown,
  DropdownItem,
} from "../UI";

import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const pathname = usePathname();

  useEffect(() => {
    if (publicKey && pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [publicKey, pathname]);

  return (
    <nav className="glass_bg px-4 border-b border-gray-50 h-16 flex items-center sticky top-0 z-20">
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
          {/* <Button
            onClick={() => {
              // if (connecting) {
              //   return;
              // }
              // connect();
              handleClick();
            }}
            variant="special"
          >
            connect wallet
          </Button> */}
          <UnifiedWalletButton
            overrideContent={<Button variant="special">connect wallet</Button>}
            currentUserClassName="border !rounded-md !h-9"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
