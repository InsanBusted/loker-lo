import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import slugify from "slugify";

// Validasi schema untuk Lowongan dengan tambahan 3 array optional
const LowonganSchema = z.object({
  namaPerusahaan: z.string().min(1),
  namaLowongan: z.string().min(1),
  deskripsi: z.string().min(1),
  bidangId: z.string().min(1),
  lokasi: z.string().min(1),
  gaji: z.string().min(1),
  benefit: z.array(z.string()),
  kualifikasi: z.array(z.string()).optional().default([]),
  tugasTanggungJawab: z.array(z.string()).optional().default([]),
  kualifikasiTambahan: z.array(z.string()).optional().default([]),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userID: string }> }
) {
  const { userID } = await params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Ambil satu lowongan by ID
      const lowongan = await prisma.lowongan.findUnique({
        where: { id },
        include: {
          bidang: true,
          proposals: true,
        },
      });

      if (!lowongan || lowongan.userId !== userID) {
        return NextResponse.json(
          { error: "Lowongan not found or not owned by user" },
          { status: 404 }
        );
      }

      return NextResponse.json(lowongan, { status: 200 });
    }

    // Kalau tidak ada ID, ambil semua lowongan user
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
  { params }: { params: Promise<{ userID: string }> }
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

    // Ambil namaPerusahaan dari data biodata
    const biodata = await prisma.biodata.findUnique({
      where: { userId: userID },
    });

    if (!biodata?.namaPerusahaan) {
      return NextResponse.json(
        { error: "Nama perusahaan tidak ditemukan di biodata." },
        { status: 400 }
      );
    }

    // Gunakan namaPerusahaan dari biodata jika tidak dikirim di body
    const namaPerusahaan =
      typeof body.namaPerusahaan === "string" &&
      body.namaPerusahaan.trim() !== ""
        ? body.namaPerusahaan
        : biodata.namaPerusahaan;

    const dataWithCompany = { ...body, namaPerusahaan };

    const parse = LowonganSchema.safeParse(dataWithCompany);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parse.error.errors },
        { status: 400 }
      );
    }

    // Slug otomatis dari nama perusahaan
    const slug = slugify(parse.data.namaLowongan, { lower: true });

    const existing = await prisma.lowongan.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Slug sudah digunakan. Gunakan nama perusahaan berbeda." },
        { status: 409 }
      );
    }

    const newLowongan = await prisma.lowongan.create({
      data: {
        userId: userID,
        namaPerusahaan: parse.data.namaPerusahaan,
        namaLowongan: parse.data.namaLowongan,
        deskripsi: parse.data.deskripsi,
        bidangId: parse.data.bidangId,
        lokasi: parse.data.lokasi,
        gaji: parse.data.gaji,
        benefit: parse.data.benefit,
        slug,
        kualifikasi: parse.data.kualifikasi,
        tugasTanggungJawab: parse.data.tugasTanggungJawab,
        kualifikasiTambahan: parse.data.kualifikasiTambahan,
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
  { params }: { params: Promise<{ userID: string }> }
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
      namaLowongan?: string;
      deskripsi?: string;
      bidangId?: string;
      lokasi?: string;
      gaji?: string;
      benefit?: string[];
      kualifikasi?: string[];
      tugasTanggungJawab?: string[];
      kualifikasiTambahan?: string[];
    };

    const lowongan = await prisma.lowongan.findUnique({ where: { id } });

    if (!lowongan || lowongan.userId !== userID) {
      return NextResponse.json(
        { error: "Lowongan not found or not owned by user" },
        { status: 404 }
      );
    }

    // Ambil namaPerusahaan dari biodata jika tidak disediakan
    let namaPerusahaan = rest.namaPerusahaan;
    if (!namaPerusahaan || namaPerusahaan.trim() === "") {
      const biodata = await prisma.biodata.findUnique({
        where: { userId: userID },
      });

      if (!biodata?.namaPerusahaan) {
        return NextResponse.json(
          { error: "Nama perusahaan tidak ditemukan di biodata." },
          { status: 400 }
        );
      }

      namaPerusahaan = biodata.namaPerusahaan;
    }

    // Periksa slug jika nama perusahaan diubah
    let slug: string | undefined;
    if (rest.namaLowongan && rest.namaLowongan !== lowongan.namaLowongan) {
      slug = slugify(rest.namaLowongan, { lower: true });
      const existingSlug = await prisma.lowongan.findUnique({
        where: { slug },
      });
      if (existingSlug && existingSlug.id !== id) {
        return NextResponse.json(
          { error: "Slug sudah digunakan. Gunakan nama perusahaan berbeda." },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.lowongan.update({
      where: { id },
      data: {
        ...rest,
        namaPerusahaan,
        ...(slug ? { slug } : {}),
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
  { params }: { params: Promise<{ userID: string }> }
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

    await prisma.proposal.deleteMany({
      where: {
        lowonganId: id,
      },
    });

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
