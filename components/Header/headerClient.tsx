"use client";

import Image from "next/image";
import Nav from "../ui/Navbar/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavProps = {
  perusahaanSlug: string | null;
  biodataSlug: string | null;
};

const ClientHeader = ({ biodataSlug, perusahaanSlug }: NavProps) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.includes("/sign-in")) return null;

  return (
    <div
      className={`
        fixed  left-1/2 -translate-x-1/2 z-50
        transition-all duration-500 ease-in-out
        ${isScrolled ? "w-full px-4 " : "w-[80vw] px-0 rounded-xl top-4"}
        bg-black text-white shadow-lg
      `}
    >
      <header className="flex items-center justify-between py-3 px-6">
        <div>
          <Image
            src="/nav.png"
            alt="LokerLo Logo"
            width={120}
            height={50}
            priority
          />
        </div>
        <div>
          <Nav biodataSlug={biodataSlug} perusahaanSlug={perusahaanSlug} />
        </div>
      </header>
    </div>
  );
};

export default ClientHeader;
