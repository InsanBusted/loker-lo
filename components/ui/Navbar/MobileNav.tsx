"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

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
  const { user } = useUser();

  return (
    <div className="absolute mt-5 right-4  top-16 z-50 w-64 bg-white p-5 rounded-md shadow-lg md:hidden">
      <ul className="flex flex-col gap-4">
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
                <ul className="pl-4 mt-2 flex flex-col gap-2">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.path}>
                      <Link
                        href={subLink.path}
                        onClick={onClose}
                        className={`block px-2 py-1 text-sm ${
                          pathname === subLink.path
                            ? "text-black font-semibold"
                            : "text-black hover:text-black"
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
                className={`block px-2 py-1 font-semibold ${
                  pathname === link.path
                    ? "text-b font-semibold"
                    : "text-black hover:text-b"
                }`}
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <SignedOut>
        <Button className="font-semibold text-white w-full mt-6 bg-black hover:bg-black/90">
          <Link href="/sign-up" onClick={onClose}>
            Login
          </Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <div className="flex gap-3 mt-6 items-center">
          <UserButton afterSignOutUrl="/" />
          {user?.username && (
            <span className="text-black font-semibold text-sm">
              {user.username}
            </span>
          )}
        </div>
      </SignedIn>
    </div>
  );
};

export default MobileNav;
