import { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Bookmark } from '@/types';

const useBookmarks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[] | []>([]);
  const { supabaseClient, session } = useSessionContext();

  const fetchBookmarks = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('user_date_bookmarks')
      .select('bookmark_name, id, desired_date')
      .eq('user_id', session?.user.id);

    if (error) {
      console.error(error.message);
    } else {
      setBookmarks(data as Bookmark[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user) {
      fetchBookmarks();
    }
  }, [session?.user, supabaseClient]);

  const deleteBookmark = async (e: React.FormEvent, id: string) => {
    e.preventDefault();

    const { data: resultData, error: resultError } = await supabaseClient
      .from('user_date_bookmarks')
      .delete()
      .eq('id', id);

    if (resultData) {
      setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== id));
    } else {
      console.error(resultError);
    }
  };

  const reloadBookmarks = () => {
    fetchBookmarks();
  };

  return { bookmarks, deleteBookmark, loading, reloadBookmarks };
};

export default useBookmarks;
