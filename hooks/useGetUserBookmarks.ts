import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Bookmark } from "@/types";

const useGetUserBookmarks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[] | []>([]);
  const { supabaseClient, session } = useSessionContext();

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    setIsLoading(true);

    const fetchBookmarks = async () => {
      const { data, error } = await supabaseClient
        .from('user_date_bookmarks')
        .select('bookmark_name, id')
        .eq('user_id', session?.user.id)

      if (error) {
        setIsLoading(false);
        return console.error(error.message);
      }

      setBookmarks(data as Bookmark[]);
      setIsLoading(false);
    }

    fetchBookmarks();
  }, [session?.user, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    bookmarks
  }), [isLoading, bookmarks]);
};

export default useGetUserBookmarks;