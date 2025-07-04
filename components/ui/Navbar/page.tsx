"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { user } = useUser();

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      // Optional: styling logic on scroll
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  const links = [
    { title: "Home", path: "/" },
    { title: "Tentang", path: "/tentang" },
    ...(biodataSlug
      ? [{ title: "Detail Profile", path: `/biodata/${biodataSlug}` }]
      : []),
    {
      title: "Lowongan",
      subLinks: [
        { title: "Lowongan Umum", path: "/lowongan" },
        ...(user && !perusahaanSlug
          ? [
              {
                title: "Kelola Lowongan",
                path: `/lowongan/kelola-lowongan/${biodataSlug}`,
              },
            ]
          : []),
        ...(user && perusahaanSlug
          ? [{ title: "Kelola Lowongan", path: `/lowongan-saya` }]
          : []),
      ],
    },
  ];

  return (
    <nav className="w-full top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isDropdown = !!link.subLinks;
            if (isDropdown) {
              return (
                <div
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeout) clearTimeout(closeTimeout);
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                      setDropdownOpen(false);
                    }, 100);
                    setCloseTimeout(timeout);
                  }}
                >
                  <button className="text-[1.3rem] flex items-center gap-1 font-semibold text-white">
                    {link.title}
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                      <ul className="py-1">
                        {link.subLinks.map((subLink) => {
                          const isSubActive = pathname === subLink.path;
                          return (
                            <li key={subLink.path}>
                              <Link
                                href={subLink.path}
                                className={`block px-4 py-2 ${
                                  isSubActive
                                    ? "text-black font-semibold"
                                    : " text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {subLink.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[1.3rem] px-2 py-1 rounded ${
                  isActive
                    ? "text-lokerlo font-semibold"
                    : "hover:bg-white hover:text-black font-semibold"
                }`}
              >
                {link.title}
              </Link>
            );
          })}

          <SignedOut>
            <Button className="font-semibold text-black bg-white hover:bg-white/80">
              <Link href="/sign-up">Login</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <div className="ml-4 flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              {user?.fullName && (
                <span className="text-white font-semibold text-[1rem]">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileNav links={links} onClose={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Nav;
