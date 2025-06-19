"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getOrCreateUser() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const email = user.emailAddresses[0].emailAddress;
  const firstName = user.firstName ?? "";
  const lastName = user.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim(); 

  const dbUser = await prisma.user.upsert({
    where: { id: user.id }, 
    update: {
      nama: fullName,
    },
    create: {
      id: user.id, 
      email,
      nama: fullName || "Pengguna",
      role: "USER",
    },
  });
  return dbUser;
}
