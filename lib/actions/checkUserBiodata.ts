"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getUserBiodataStatus = async () => {
  const { userId } = await auth();
  if (!userId) return { hasBiodata: false, userId: null };

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { biodata: true },
  });

  // console.log("User:", user); // Lihat isi user & biodata

  return {
    hasBiodata: Boolean(user?.biodata),
    userId,
  };
};
