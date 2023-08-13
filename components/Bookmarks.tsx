import useGetUserBookmarks from '@/hooks/useGetUserBookmarks'
import { Bookmark } from '@/types';

import { Skeleton } from "@/components/ui/skeleton"

const Bookmarks = () => {
  const { bookmarks, isLoading } = useGetUserBookmarks();

  const calculateTimeDifference = (dateString: string) => {
    if (!dateString) {
      return <p>Desired Date is undefined</p>;
    }

    try {
      const date = new Date(dateString);
      const currentTime = new Date();
      const timeDifference = Math.abs(date.getTime() - currentTime.getTime());

      const oneYear = 1000 * 60 * 60 * 24 * 365.25;
      const years = Math.floor(timeDifference / oneYear);
      const remainingTime = timeDifference % oneYear;
      const oneMonth = 1000 * 60 * 60 * 24 * 30.44;
      const months = Math.floor(remainingTime / oneMonth);
      const remainingTimeMonths = remainingTime % oneMonth;
      const oneDay = 1000 * 60 * 60 * 24;
      const days = Math.floor(remainingTimeMonths / oneDay);

      return (
        <div>
          <div className='text-xs flex justify-between gap-2 items-center text-neutral-400'>
            Years left:
            <p className='text-base text-white'>{years}</p>
          </div>
          <div className='text-xs flex justify-between gap-2 items-center text-neutral-400'>
            Months left:
            <p className='text-base text-white'>{months}</p>
          </div>
          <div className='text-xs flex justify-between gap-2 items-center text-neutral-400'>
            Days left:
            <p className='text-base text-white'>{days}</p>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error calculating time difference:", error);
      return <p>Error calculating time difference</p>;
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl'>Bookmarks</h1>
      {
        isLoading ? (
          <div className='flex flex-col gap-2 w-full'>
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
            <Skeleton className="w-1/2 h-[20px] rounded-full" />
          </div>
        )
          : (
            <div className='flex flex-col gap-4'>
              {
                bookmarks.map((bookmark: Bookmark) => (
                  <div key={bookmark.id} className='border border-white flex flex-col px-2 py-2 rounded-lg'>
                    <div className='flex justify-between'>
                      <div className='flex flex-col'>
                        <p className='text-white'>{bookmark.bookmark_name}</p>
                        <p className='text-white'>{bookmark.desired_date}</p>
                      </div>
                      <p className='text-white'>{calculateTimeDifference(bookmark.desired_date)}</p>
                    </div>
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