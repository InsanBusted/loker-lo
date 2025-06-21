import prisma from "../prisma";

export async function getInitialLowongan() {
  return await prisma.lowongan.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { bidang: true },
  });
}
