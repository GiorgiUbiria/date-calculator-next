'use client';

import { User } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";

import { ModeToggle } from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
import MainLogo from "./MainLogo";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className='fixed inset-x-0 top-0 bg-sea-blue dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2'>
      <div className='flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl'>
        <MainLogo />
        <div className="flex items-center">
          <ModeToggle />
          <UserAvatar user={user as User} />
        </div>
      </div>
    </div>
  )
}

export default Navbar