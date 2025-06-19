"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";

export const getBidang = async () => {
  try {
    const data = await prisma.bidang.findMany({
      orderBy: {
        nama: "asc",
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal mengambil data bidang:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
export const getSkill = async () => {
  try {
    const data = await prisma.skill.findMany({
      orderBy: {
        nama: "asc",
      },
    });
    return data;
  } catch (error) {
    console.error("Gagal mengambil data skill:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

export async function getUserBiodataSlug() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const biodata = await prisma.biodata.findUnique({
      where: { userId },
    });

    return biodata?.slug || null;
  } catch (error) {
    console.error("Gagal mengambil slug biodata user:", error);
    return null;
  } 
}

export async function getBiodata(slug: string) {
  try {
    const biodata = await prisma.biodata.findUnique({
      where: { slug },
      include: {
        bidang: true,
        skills: true,
      },
    });

    return biodata;
  } catch (error) {
    console.error("Gagal mengambil biodata by slug:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getBiodataByUserId(userId: string) {
  try {
    const biodata = await prisma.biodata.findUnique({
      where: { userId },
      include: {
        bidang: true,
        skills: true,
      },
    });

    return biodata;
  } catch (error) {
    console.error("Gagal mengambil biodata by userId:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
