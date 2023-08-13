'use client'

import { User, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import useAuthModal from "@/hooks/useAuthModal"
import useBookmarkDrawer from "@/hooks/useBookmarkDrawer"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"

import { ExitIcon, EnterIcon, BookmarkIcon } from "@radix-ui/react-icons"

interface UserAvatarProps {
  user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const { onOpen } = useAuthModal();
  const { onOpen: onBookmarksOpen } = useBookmarkDrawer();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      console.error(error.message);
    } else {
      console.log('Logged out successfully!')
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          {
            user ? (
              <>
                <Image src="https://github.com/shadcn.png" fill alt={user.email?.at(0)?.toLocaleUpperCase()!} loading="lazy" />
              </>
            ) : (
              <AvatarImage src="http://clipart-library.com/images_k/calculator-transparent/calculator-transparent-16.png" />
            )
          }

        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {
          !user ? (
            <DropdownMenuItem onClick={onOpen}>
              Sign In <EnterIcon className="ml-5" />
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={handleLogout}>
                <div className="w-full flex justify-between items-center">
                  <p>Sign Out</p>
                  <ExitIcon />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBookmarksOpen}>
                <div className="w-full flex justify-between items-center">
                  <p>Bookmarks</p>
                  <BookmarkIcon />
                </div>
              </DropdownMenuItem>
            </>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default UserAvatar;