"use client";

import Nav from "../ui/Navbar";
import { usePathname } from "next/navigation";

const ClientHeader = () => {
  const pathname = usePathname();

  if (pathname.includes("/sign-in")) return null;

  return (
    <div className="fixed w-full z-50 bg-white shadow-md">
      <header className="flex items-center justify-between py-[15px] w-[80%] m-auto">
        <div>
          <h1 className="font-bold text-[3rem] ">LokerLo</h1>
        </div>
        <div className="z-50">
          <Nav />
        </div>
      </header>
    </div>
  );
};

export default ClientHeader;
