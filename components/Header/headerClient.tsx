"use client";

import Nav from "../ui/Navbar/page";
import { usePathname } from "next/navigation";

type NavProps = {
  perusahaanSlug: string | null;
  biodataSlug: string | null;
};

const ClientHeader = ({biodataSlug, perusahaanSlug }: NavProps) => {
  const pathname = usePathname();

  if (pathname.includes("/sign-in")) return null;

  return (
    <div className="fixed w-full z-50 bg-white shadow-md">
      <header className="flex items-center justify-between py-[15px] w-[80%] m-auto">
        <div>
          <h1 className="font-bold text-[3rem] ">LokerLo</h1>
        </div>
        <div className="z-50">
          <Nav biodataSlug={biodataSlug} perusahaanSlug={perusahaanSlug} />
        </div>
      </header>
    </div>
  );
};

export default ClientHeader;
