import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { status } = await req.json();
  const resolvedParams = await params;

  await prisma.biodata.update({
    where: { id: resolvedParams.id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
