import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.lowongan.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { bidang: true },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/lowongan/initial:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
