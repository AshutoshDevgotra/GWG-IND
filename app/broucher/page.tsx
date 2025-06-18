"use client";

import { useEffect } from 'react';

export default function BroucherRedirect() {
  useEffect(() => {
    window.location.replace("https://growwithgarry.my.canva.site/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-700">
        Redirecting to our brochure... If not redirected,{" "}
        <a href="https://growwithgarry.my.canva.site/" className="text-blue-600 underline">
          click here
        </a>.
      </p>
    </div>
  );
}
