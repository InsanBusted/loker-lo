"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import MobileNav from "./MobileNav";

import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

type NavProps = {
  perusahaanSlug: string | null;
  biodataSlug: string | null;
};

const Nav = ({ biodataSlug, perusahaanSlug }: NavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const links = [
    { title: "Home", path: "/" },
    { title: "Tentang", path: "/tentang" },
    { title: "Lowongan", path: "/lowongan" },
    biodataSlug && { title: "Detail Profile", path: `/biodata/${biodataSlug}` },
    perusahaanSlug && {
      title: "Lowongan Saya",
      path: `/lowongan-saya`,
    },
  ].filter(Boolean) as { title: string; path: string }[];

  return (
    <nav className="w-full top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[1.3rem] px-2 py-1 rounded ${
                  isActive
                    ? "text-lokerlo font-semibold"
                    : "hover:bg-white hover:text-lokerlo font-semibold"
                }`}
              >
                {link.title}
              </Link>
            );
          })}

          <SignedOut>
            <Button className="font-semibold text-white">
              <Link href="/sign-up">Login</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <div className="ml-4 flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              {user?.fullName && (
                <span className="text-black font-semibold text-[1rem]">
                  {user.username}
                </span>
              )}
            </div>
          </SignedIn>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <MobileNav links={links} onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Nav;
