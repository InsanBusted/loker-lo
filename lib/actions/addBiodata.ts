"use server";

import slugify from "slugify";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { BiodataSchema } from "../validation/biodata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitBiodata(prevState: any, formData: FormData) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { success: false, error: "User belum login" };
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return { success: false, error: "Email user tidak ditemukan" };
  }

  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    return { success: false, error: "User tidak ditemukan di database" };
  }

  const rawData = {
    namaLengkap: formData.get("namaLengkap")?.toString() || "",
    namaPerusahaan: formData.get("namaPerusahaan")?.toString() || "",
    bidang: formData.get("bidang")?.toString() || "",
    skill: JSON.parse(formData.get("skill")?.toString() || "[]"),
    kategori: formData.get("kategori")?.toString() || "",
    status: formData.get("status")?.toString() || "",
    deskripsi: formData.get("deskripsi")?.toString() || "",
    imgProfile: formData.get("imgProfile")?.toString() || "",
    documentUrl: formData.get("documentUrl")?.toString() || "",
    documentPendukung: formData.get("documentPendukung")?.toString() || "",
    tahunLulus: formData.get("tahunLulus")
      ? parseInt(formData.get("tahunLulus")!.toString(), 10)
      : undefined,
  };

  const validated = BiodataSchema.safeParse(rawData);
  if (!validated.success) {
    const errors = validated.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  try {
    const bidang = await prisma.bidang.findUnique({
      where: { id: validated.data.bidang },
    });
    if (!bidang) {
      return { success: false, error: "Bidang tidak ditemukan" };
    }

    const skills = validated.data.skill?.length
      ? await prisma.skill.findMany({
          where: { id: { in: validated.data.skill } },
        })
      : [];

    if (
      validated.data.skill?.length &&
      skills.length !== validated.data.skill.length
    ) {
      return { success: false, error: "Skill tidak ditemukan" };
    }

    const existingBiodata = await prisma.biodata.findFirst({
      where: { userId: dbUser.id },
    });

    const baseName =
      validated.data.kategori === "perusahaan"
        ? validated.data.namaPerusahaan
        : validated.data.namaLengkap;

    const slug = slugify(baseName || "user", { lower: true, strict: true });

    if (existingBiodata) {
      // UPDATE
      await prisma.biodata.update({
        where: { id: existingBiodata.id },
        data: {
          namaLengkap: validated.data.namaLengkap,
          slug,
          namaPerusahaan: validated.data.namaPerusahaan,
          documentUrl: validated.data.documentUrl,
          documentPendukung: validated.data.documentPendukung,
          kategori: validated.data.kategori,
          status: validated.data.status,
          tahunLulus: validated.data.tahunLulus,
          bidangId: bidang.id,
          deskripsi: validated.data.deskripsi,
          imgProfile: validated.data.imgProfile,
          skills: {
            set: [], // clear existing skills
            connect: (validated.data.skill ?? []).map((id) => ({ id })),
          },
        },
      });
    } else {
      // CREATE
      await prisma.biodata.create({
        data: {
          namaLengkap: validated.data.namaLengkap,
          slug,
          namaPerusahaan: validated.data.namaPerusahaan,
          documentUrl: validated.data.documentUrl,
          documentPendukung: validated.data.documentPendukung,
          kategori: validated.data.kategori,
          status: validated.data.status,
          tahunLulus: validated.data.tahunLulus,
          bidangId: bidang.id,
          deskripsi: validated.data.deskripsi,
          imgProfile: validated.data.imgProfile,
          userId: dbUser.id,
          skills: {
            connect: (validated.data.skill ?? []).map((id) => ({ id })),
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("DB error:", error);
    return {
      success: false,
      error: "Terjadi kesalahan saat menyimpan biodata.",
    };
  }
}
