// components/ui/MobileMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";

interface MobileMenuProps {
  links: {
    title: string;
    path?: string;
    subLinks?: { title: string; path: string }[];
  }[];
  onClose: () => void;
}

const MobileNav = ({ links, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <div className="absolute mt-5 top-16 right-4 z-50 bg-white p-4 rounded-md w-60 md:hidden">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.path || link.title}>
            {link.subLinks ? (
              <details className="group">
                <summary className="cursor-pointer px-2 py-1 font-semibold text-black list-none flex justify-between items-center">
                  {link.title}
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ul className="pl-4 mt-2 flex flex-col gap-1">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.path}>
                      <Link
                        href={subLink.path}
                        onClick={onClose}
                        className={`block px-2 py-1 text-sm ${
                          pathname === subLink.path
                            ? "text-lokerlo font-semibold"
                            : "text-black"
                        }`}
                      >
                        {subLink.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                href={link.path || "#"}
                onClick={onClose}
                className={`block px-2 py-1 font-medium ${
                  pathname === link.path
                    ? "text-lokerlo font-semibold"
                    : "text-black"
                }`}
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <Button className="font-semibold text-white w-full mt-3">
        <Link href="/regist"> Daftar</Link>
      </Button>
    </div>
  );
};

export default MobileNav;