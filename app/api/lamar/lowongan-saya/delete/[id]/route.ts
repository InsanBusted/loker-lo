import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;

  try {
    await prisma.proposal.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ message: "Proposal berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus proposal:", error);
    return NextResponse.json(
      { error: "Gagal menghapus proposal" },
      { status: 500 }
    );
  }
}
