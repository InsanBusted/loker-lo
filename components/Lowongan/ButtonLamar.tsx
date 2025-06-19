"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LamarSekarangButton({ slug }: { slug: string }) {
  const pathname = usePathname();

  // Jangan tampilkan tombol jika di path /lowongan-saya/[slug]
  const isMyLowonganPage = pathname.startsWith("/lowongan-saya/");

  if (isMyLowonganPage) return null;

  return (
    <Link href={`/lamar/${slug}`}>
      <Button className="w-full mt-4 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-sm font-medium cursor-pointer">
        Lamar Sekarang
      </Button>
    </Link>
  );
}
