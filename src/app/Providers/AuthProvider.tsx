"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firestore/firebase";
import { useUserStore } from "../store/useUserStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setIsUserLoading = useUserStore((state) => state.setIsUserLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        clearUser();
      }
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setIsUserLoading]);

  return <>{children}</>;
}
