import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const lowongan = await prisma.lowongan.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!lowongan) {
      return NextResponse.json(
        { error: "Lowongan tidak ditemukan" },
        { status: 404 }
      );
    }

    const proposals = await prisma.proposal.findMany({
      where: { lowonganId: lowongan.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            biodata: {
              select: {
                namaLengkap: true,
                slug: true,
              },
            },
          },
        },
        lowongan: true,
      },
      orderBy: { status: "asc" },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Gagal mengambil data proposal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
