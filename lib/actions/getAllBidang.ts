import prisma from "../prisma";

export async function getAllBidang() {
  try {
    const bidang = await prisma.bidang.findMany({
      orderBy: { nama: "asc" },
    });
    return bidang;
  } catch (error) {
    console.error("Error fetching bidang:", error);
    return [];
  }
}
