"use server";

import prisma from "@/lib/prisma";

export async function getProposalsByBiodataSlug(slug: string) {
  try {
    const biodata = await prisma.biodata.findUnique({
      where: { slug },
    });

    // console.log("Biodata:", biodata);

    if (!biodata) return null;

    const proposals = await prisma.proposal.findMany({
      where: { userId: biodata.userId },
      include: {
        lowongan: {
          include: {
            bidang: true,
          },
        },
        user: {
          include: {
            biodata: true, // ⬅️ tambahkan ini
          },
        },
      },
    });

    // console.log("Proposals:", proposals);

    return proposals;
  } catch (error) {
    console.error("Gagal mengambil proposal:", error);
    return null;
  }
}
