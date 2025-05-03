"use client";

import { useEffect, useState } from "react";

export default function ClientHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-40 top-0 py-5 transition-colors duration-300 ${
        scrolled && "bg-gray-900 shadow-md"
      }`}
    >
      {children}
    </header>
  );
}
