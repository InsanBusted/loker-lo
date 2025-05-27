"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";

export async function getBiodata() {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const biodata = await prisma.biodata.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      bidang: true,
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  return biodata;
}
