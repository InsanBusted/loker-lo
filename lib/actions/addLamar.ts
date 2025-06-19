"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { lamarSchema } from "../validation/lamar";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitLamar(prevState: any, formData: FormData) {
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

  // Ambil data dari FormData (kecuali userId)
  const rawDataFromForm = {
    lowonganId: formData.get("lowonganId")?.toString() || "",
    status: formData.get("status")?.toString() || "pending",
    coverLetter: formData.get("coverLetter")?.toString() || "",
    documentUrl: formData.get("documentUrl")?.toString() || "",
  };

  // Validasi data dari form
  const validatedForm = lamarSchema.safeParse(rawDataFromForm);
  if (!validatedForm.success) {
    const errors = validatedForm.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  try {
    // Cek apakah sudah pernah melamar
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        userId: dbUser.id,
        lowonganId: validatedForm.data.lowonganId,
      },
    });

    if (existingProposal) {
      return {
        success: false,
        error: "Kamu sudah melamar ke lowongan ini.",
      };
    }

    // Simpan proposal baru
    await prisma.proposal.create({
      data: {
        userId: dbUser.id,
        ...validatedForm.data,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Gagal menyimpan proposal:", error);
    return {
      success: false,
      error: "Terjadi kesalahan saat menyimpan proposal.",
    };
  }
}
