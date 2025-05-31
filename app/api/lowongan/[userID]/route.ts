import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validasi schema untuk Lowongan
const LowonganSchema = z.object({
  namaPerusahaan: z.string().min(1),
  deskripsi: z.string().min(1),
  bidangId: z.number(),
  lokasi: z.string().min(1),
  gaji: z.string().min(1),
  benefit: z.array(z.string()),
});

export async function GET(
  _req: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = await params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const lowongans = await prisma.lowongan.findMany({
      where: { userId: userID },
      include: {
        bidang: true,
        proposals: true,
      },
    });

    return NextResponse.json({ data: lowongans }, { status: 200 });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = await params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid body format" },
        { status: 400 }
      );
    }

    const parse = LowonganSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parse.error.errors },
        { status: 400 }
      );
    }

    const newLowongan = await prisma.lowongan.create({
      data: {
        userId: userID,
        namaPerusahaan: parse.data.namaPerusahaan,
        deskripsi: parse.data.deskripsi,
        bidangId: parse.data.bidangId,
        lokasi: parse.data.lokasi,
        gaji: parse.data.gaji,
        benefit: parse.data.benefit,
      },
    });

    return NextResponse.json(newLowongan, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = await params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      typeof (body as { id?: unknown }).id !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid lowongan ID for update" },
        { status: 400 }
      );
    }

    const { id, ...rest } = body as {
      id: string;
      namaPerusahaan?: string;
      deskripsi?: string;
      bidangId?: number;
      lokasi?: string;
      gaji?: string;
      benefit?: string[];
    };

    const lowongan = await prisma.lowongan.findUnique({
      where: { id },
    });

    if (!lowongan || lowongan.userId !== userID) {
      return NextResponse.json(
        { error: "Lowongan not found or not owned by user" },
        { status: 404 }
      );
    }

    const updated = await prisma.lowongan.update({
      where: { id },
      data: {
        ...rest,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userID: string } }
) {
  const { userID } = params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Pastikan body adalah objek dengan properti 'id' bertipe string
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      typeof (body as { id?: unknown }).id !== "string"
    ) {
      return NextResponse.json(
        { error: "Body harus berisi objek dengan properti id (string)" },
        { status: 400 }
      );
    }

    const { id } = body as { id: string };

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid lowongan ID" },
        { status: 400 }
      );
    }

    const lowongan = await prisma.lowongan.findUnique({
      where: { id },
    });

    if (!lowongan || lowongan.userId !== userID) {
      return NextResponse.json(
        { error: "Lowongan not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.lowongan.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Lowongan deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
