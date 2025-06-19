"use server";

import { prisma } from "@/lib/prisma";
import { updateProposalSchema } from "@/lib/validation/updateProposal";
import { redirect } from "next/navigation";

export async function updateProposalStatusAction(data: FormData) {
  const parsed = updateProposalSchema.safeParse({
    proposalId: data.get("proposalId"),
    status: data.get("status"),
  });

  if (!parsed.success) {
    throw new Error("Data tidak valid");
  }

  const { proposalId, status } = parsed.data;

  // Ambil slug lowongan dari relasi proposal
  const proposal = await prisma.proposal.update({
    where: { id: proposalId },
    data: { status },
    include: {
      lowongan: {
        select: {
          slug: true,
        },
      },
    },
  });

  // Redirect ke /lowongan-saya/[slug]
  redirect(`/lowongan-saya/${proposal.lowongan.slug}`);
}
