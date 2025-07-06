import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';

const menuOptions = [
  { id: 1, name: 'Home', path: '/dashboard' },
  { id: 2, name: 'History', path: '/dashboard/history' },
  { id: 3, name: 'Pricing', path: '/dashboard/billing' },
  { id: 4, name: 'Profile', path: '/dashboard/profile' },
];

function AppHeader() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm rounded-2x px-10 md:px-20 lg:px-40">
      <Link href="/home">
        <Image src="/Images/Logo/logo.svg" width={180} height={80} alt="Logo" />
      </Link>

      <div className="hidden md:flex items-center gap-12">
        {menuOptions.map((option) => (
          <Link href={option.path} key={option.id}>
            <h2 className="hover:font-bold cursor-pointer transition-all">
              {option.name}
            </h2>
          </Link>
        ))}
      </div>

      <UserButton />
    </div>
  );
}

export default AppHeader;
