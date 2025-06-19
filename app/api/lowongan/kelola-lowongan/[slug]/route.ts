import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  const { slug } = await params;
  console.log(userId);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      where: {
        lowonganId: lowongan.id,
        userId, // hanya proposal yang dikirim oleh user saat ini
      },
      include: {
        lowongan: true,
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
