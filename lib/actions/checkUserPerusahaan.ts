"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getUserPerusahaanSlug() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { biodata: true },
  });

  if (user?.biodata?.kategori === "perusahaan") {
    return user.biodata.slug;
  }

  return null;
}