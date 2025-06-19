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

  // Ambil data dari FormData
  const rawDataFromForm = {
    lowonganId: formData.get("lowonganId")?.toString() || "",
    coverLetter: formData.get("coverLetter")?.toString() || "",
    documentUrl: formData.get("documentUrl")?.toString() || "",
  };

  const validatedForm = lamarSchema.safeParse(rawDataFromForm);
  if (!validatedForm.success) {
    const errors = validatedForm.error.errors.map((e) => e.message).join(", ");
    return { success: false, error: "Data tidak valid: " + errors };
  }

  try {
    const { lowonganId, coverLetter, documentUrl } = validatedForm.data;

    const existingProposal = await prisma.proposal.findFirst({
      where: {
        userId: dbUser.id,
        lowonganId,
      },
    });

    if (existingProposal) {
      // EDIT → update existing proposal dan reset status ke pending
      await prisma.proposal.update({
        where: { id: existingProposal.id },
        data: {
          coverLetter,
          documentUrl,
          status: "pending", // reset status
        },
      });

      return { success: true, message: "Proposal berhasil diperbarui." };
    }

    // BUAT BARU
    await prisma.proposal.create({
      data: {
        userId: dbUser.id,
        lowonganId,
        coverLetter,
        documentUrl,
        status: "pending", // status awal
      },
    });

    return { success: true, message: "Proposal berhasil dikirim." };
  } catch (error) {
    console.error("Gagal menyimpan proposal:", error);
    return {
      success: false,
      error: "Terjadi kesalahan saat menyimpan proposal.",
    };
  }
}
