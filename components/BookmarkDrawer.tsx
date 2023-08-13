import useBookmarkDrawer from '@/hooks/useBookmarkDrawer';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import Bookmarks from './Bookmarks';

const BookmarkDrawer = () => {
  const { onClose, isOpen } = useBookmarkDrawer();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Sheet key={'right'} open={isOpen} onOpenChange={onChange}>
      <SheetContent side={'right'}>
        <SheetHeader>
          <SheetTitle>My Bookmarks</SheetTitle>
          <SheetDescription>
            View, Edit or Delete your saved bookmarks
          </SheetDescription>
        </SheetHeader>
        <Bookmarks />
      </SheetContent>
    </Sheet>
  )
}

export default BookmarkDrawer