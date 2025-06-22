import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const biodata = await prisma.biodata.findMany({
    select: {
      id: true,
      namaLengkap: true,
      namaPerusahaan: true,
      kategori: true,
      status: true,
      documentPendukung: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      bidang: {
        select: {
          nama: true,
        },
      },
    },
  });

  const result = biodata.map((d) => {
    return {
      id: d.id,
      userId: d.user.id,
      namaLengkap: d.namaLengkap,
      namaPerusahaan: d.namaPerusahaan,
      email: d.user.email,
      kategori: d.kategori,
      status: d.status,
      bidang: {
        nama: d.bidang.nama,
      },
      documentPendukung: d.documentPendukung,
    };
  });

  return NextResponse.json(result);
}
