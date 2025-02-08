import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";

const useUpdateExpertStatus = () => {
  useEffect(() => {
    const updateStatus = async (uid: string, isOnline: boolean) => {
      if (!uid) return;

      await setDoc(
        doc(db, "experts", uid),
        {
          online: isOnline,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateStatus(user.uid, true);
        window.addEventListener("beforeunload", () => updateStatus(user.uid, false));
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useUpdateExpertStatus;
