import { create } from 'zustand';

interface SaveBookmarkFormStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSaveBookmarkForm = create<SaveBookmarkFormStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSaveBookmarkForm;