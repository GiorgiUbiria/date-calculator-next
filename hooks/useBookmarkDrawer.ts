import { create } from 'zustand';

interface BookmarkDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBookmarkDrawer = create<BookmarkDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBookmarkDrawer;