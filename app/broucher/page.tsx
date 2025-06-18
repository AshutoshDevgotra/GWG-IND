// /pages/broucher.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BroucherRedirect() {
  const router = useRouter();
  useEffect(() => {
    window.location.href = "https://growwithgarry.my.canva.site/";
  }, []);
  return null;
}
