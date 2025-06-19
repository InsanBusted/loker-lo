import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    const lowongans = await prisma.lowongan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        namaLowongan: true,
        lokasi: true,
        bidang: {
          select: { nama: true },
        },
      },
    });

    return NextResponse.json(lowongans);
  } catch (error) {
    console.error("[GET LOWONGAN ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
