"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { editBiodataSchema } from "../validation/biodata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateBiodata(
  slug: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return { success: false, error: "User belum login" };
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) {
    return { success: false, error: "Email user tidak ditemukan" };
  }

  const dbUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!dbUser) {
    return { success: false, error: "User tidak ditemukan di database" };
  }

  const rawData = {
    namaLengkap: formData.get("namaLengkap")?.toString() || "",
    namaPerusahaan: formData.get("namaPerusahaan")?.toString() || "",
    bidang: formData.get("bidang")?.toString() || "",
    skill: JSON.parse(formData.get("skill")?.toString() || "[]"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kategori: formData.get("kategori")?.toString() as any,
    deskripsi: formData.get("deskripsi")?.toString() || "",
    imgProfile: formData.get("imgProfile")?.toString() || "",
    documentUrl: formData.get("documentUrl")?.toString() || "",
    tahunLulus: formData.get("tahunLulus")
      ? parseInt(formData.get("tahunLulus")!.toString(), 10)
      : undefined,
  };

  const validated = editBiodataSchema.safeParse(rawData);
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
      return { success: false, error: "Skill tidak valid" };
    }

    const biodata = await prisma.biodata.findUnique({
      where: { slug },
    });

    if (!biodata || biodata.userId !== dbUser.id) {
      return {
        success: false,
        error: "Biodata tidak ditemukan atau tidak sesuai dengan user",
      };
    }

    await prisma.biodata.update({
      where: { id: biodata.id },
      data: {
        namaLengkap: validated.data.namaLengkap,
        namaPerusahaan: validated.data.namaPerusahaan,
        documentUrl: validated.data.documentUrl,
        kategori: validated.data.kategori,
        tahunLulus: validated.data.tahunLulus,
        bidangId: bidang.id,
        deskripsi: validated.data.deskripsi,
        imgProfile: validated.data.imgProfile,
        skills: {
          set: validated.data.skill?.map((id) => ({ id })) || [],
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return {
      success: false,
      error: "Gagal mengupdate biodata",
    };
  }
}
