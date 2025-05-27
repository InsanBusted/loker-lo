import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // sesuaikan import prisma-mu
import { BiodataSchema } from "@/lib/validation/biodata"; // sesuaikan path

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userID: string }> }
) {
  const { userID } = await params;

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  try {
    const biodata = await prisma.biodata.findUnique({
      where: { userId: userID },
      include: {
        bidang: true,
        skills: { include: { skill: true } },
      },
    });

    if (!biodata) {
      return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
    }

    return NextResponse.json({ data: biodata }, { status: 200 });
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

    // pastikan body itu object (bukan null atau array)
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body harus berupa objek" },
        { status: 400 }
      );
    }

    const parse = BiodataSchema.safeParse({ ...body, userId: userID });

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parse.error.errors },
        { status: 400 }
      );
    }

    // Cek kalau sudah ada biodata user, return error agar gunakan PUT untuk update
    const exists = await prisma.biodata.findUnique({
      where: { userId: userID },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Biodata sudah ada, gunakan update" },
        { status: 409 }
      );
    }

    const newBiodata = await prisma.biodata.create({
      data: {
        userId: userID,
        documentUrl: parse.data.documentUrl,
        imgProfile: parse.data.imgProfile,
        deskripsi: parse.data.deskripsi,
        kategori: parse.data.kategori, // enum string
        bidangId: Number(parse.data.bidangId),
        tahunLulus: parse.data.tahunLulus
          ? Number(parse.data.tahunLulus)
          : null,
        namaPerusahaan: parse.data.namaPerusahaan || null,
      },
    });
    return NextResponse.json(newBiodata, { status: 201 });
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

    // pastikan body itu object (bukan null atau array)
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body harus berupa objek" },
        { status: 400 }
      );
    }

    const parse = BiodataSchema.safeParse({ ...body, userId: userID });

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parse.error.errors },
        { status: 400 }
      );
    }

    // Pastikan biodata sudah ada
    const exists = await prisma.biodata.findUnique({
      where: { userId: userID },
    });

    if (!exists) {
      return NextResponse.json(
        { error: "Biodata tidak ditemukan, gunakan POST untuk membuat" },
        { status: 404 }
      );
    }

    const updatedBiodata = await prisma.biodata.update({
      where: { userId: userID },
      data: {
        documentUrl: parse.data.documentUrl,
        imgProfile: parse.data.imgProfile,
        deskripsi: parse.data.deskripsi,
        kategori: parse.data.kategori,
        bidangId: Number(parse.data.bidangId),
        tahunLulus: parse.data.tahunLulus
          ? Number(parse.data.tahunLulus)
          : null,
        namaPerusahaan: parse.data.namaPerusahaan,
      },
    });

    return NextResponse.json(updatedBiodata, { status: 200 });
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
