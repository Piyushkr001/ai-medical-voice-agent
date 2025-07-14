"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ThemeSwitcher";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 px-4 py-3 rounded-3xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Images/Logo/logo.svg"
            alt="Logo"
            width={140}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/sign-in" />
              <Link href="/dashboard">
                <Button variant="default" className="hidden sm:block">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
