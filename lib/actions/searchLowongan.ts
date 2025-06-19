"use server";

import prisma from "../prisma";

export async function searchLowongan(search: string) {
  if (!search.trim()) return [];

  const jobs = await prisma.lowongan.findMany({
    where: {
      OR: [
        {
          namaPerusahaan: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          namaLowongan: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lokasi: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          deskripsi: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          bidang: {
            nama: {
              contains: search,
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

  return jobs;
}
