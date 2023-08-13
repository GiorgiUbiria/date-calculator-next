import useGetUserBookmarks from '@/hooks/useGetUserBookmarks'
import { Bookmark } from '@/types';

import { Skeleton } from "@/components/ui/skeleton"

const Bookmarks = () => {
  const { bookmarks, isLoading } = useGetUserBookmarks();

  return (
    <div>
      <h1>Bookmarks</h1>
      {
        isLoading ? (
          <div className='flex flex-col gap-2 w-full'>
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
          </div>
        )
          : (
            <div>
              {
                bookmarks.map((bookmark: Bookmark) => (
                  <div key={bookmark.id}>
                    <p className='text-white'>{bookmark.bookmark_name}</p>
                  </div>
                ))
              }
            </div>
          )
      }
    </div>
  )
}

export default Bookmarks