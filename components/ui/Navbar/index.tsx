"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import MobileNav from "./MobileNav";

const links = [
  { title: "Home", path: "/" },
  { title: "Tentang", path: "/tentang" },
  { title: "Ketentuan", path: "/ketentuan" },
  {
    title: "Mentoring & Nilai",
    subLinks: [
      { title: "Ketentuan Mentoring", path: "/mentoring" },
      { title: "Ketentuan Nilai", path: "/detail-penilaian" },
    ],
  },
];

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  return (
    <nav className="w-full top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => {
            const isActive = pathname === link.path;
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
                  <button className="text-[1.3rem] flex items-center gap-1 text-lokerlo">
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
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 ">
                      <ul className="py-1">
                        {link.subLinks.map((subLink) => {
                          const isSubActive = pathname === subLink.path;
                          return (
                            <li key={subLink.path}>
                              <Link
                                href={subLink.path}
                                className={`block px-4 py-2 ${
                                  isSubActive
                                    ? "bg-lokerlo/10 text-lokerlo"
                                    : "text-gray-700 hover:bg-gray-100"
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
          <Button className="font-semibold text-white">
            <Link href="/sign-up">Daftar</Link>
          </Button>
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
