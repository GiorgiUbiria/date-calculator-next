"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import BookmarkDrawer from "@/components/BookmarkDrawer";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <BookmarkDrawer />
    </>
  );
}

export default ModalProvider;