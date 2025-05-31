import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Missing search query" },
        { status: 400 }
      );
    }

    const lowongans = await prisma.lowongan.findMany({
      where: {
        OR: [
          {
            namaPerusahaan: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            deskripsi: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            bidang: {
              nama: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        bidang: true,
      },
    });

    return NextResponse.json({ data: lowongans }, { status: 200 });
  } catch (error) {
    console.error("API search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
