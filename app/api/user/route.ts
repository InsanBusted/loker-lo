import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ biodataLengkap: false });

  const biodata = await prisma.biodata.findFirst({
    where: { userId },
    select: {
      kategori: true,
    },
  });

  const biodataLengkap = !!biodata?.kategori; 

  return NextResponse.json({
    userID: userId,
    biodataLengkap,
  });
}
