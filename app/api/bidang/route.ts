import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const bidangSchema = z.object({
  slug: z.string(),
  nama: z.string(),
});

const bulkSchema = z.array(bidangSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = bulkSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parse.error.errors },
        { status: 400 }
      );
    }

    const created = await prisma.bidang.createMany({
      data: parse.data,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: `Inserted ${created.count} bidang` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const data = await prisma.bidang.findMany({
    orderBy: { nama: "asc" },
    select: { id: true, nama: true },
  });
  return NextResponse.json(data);
}
