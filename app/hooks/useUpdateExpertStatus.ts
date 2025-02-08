import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useExpertStatus = (expertId: string) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!expertId) return;

    const expertRef = doc(db, "experts", expertId);

    const unsubscribe = onSnapshot(expertRef, (docSnap) => {
      if (docSnap.exists()) {
        setIsOnline(docSnap.data().online);
      } else {
        setIsOnline(false);
      }
    });

    return () => unsubscribe();
  }, [expertId]);

  return isOnline;
};

export default useExpertStatus;
