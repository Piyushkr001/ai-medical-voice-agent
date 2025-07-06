"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeSwitcher";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex w-full items-center justify-between shadow border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 rounded-2xl">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/Images/Logo/logo.svg"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <ModeToggle/>
          <UserButton afterSignOutUrl="/login" />
          <Link href="/dashboard">
          <Button>Dashboard</Button>
          </Link>
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;