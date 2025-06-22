import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import LamarForm from "@/components/Lamar/LamarForm";

type Props = { params: Promise<{ slugLowongan: string }> };

export default async function EditLamaranPage({ params }: Props) {
  const { userId } = await auth();
  const resolvedParams = await params;
  if (!userId) {
    return (
      <p className="text-center mt-10">Silakan login untuk melanjutkan.</p>
    );
  }

  const lowongan = await prisma.lowongan.findUnique({
    where: { slug: resolvedParams.slugLowongan },
  });

  if (!lowongan) return notFound();

  // Ambil proposal milik user yang sedang login (dari tabel `Proposal`)
  const proposal = await prisma.proposal.findFirst({
    where: {
      userId,
      lowonganId: lowongan.id,
    },
  });

  if (!proposal) {
    return <p className="text-center mt-10">Lamaran tidak ditemukan.</p>;
  }

  return (
    <div className="w-[80vw] mx-auto pt-[10rem]">
      <h1 className="text-2xl font-bold mb-6">Edit Lamaran</h1>
      <LamarForm
        userId={userId}
        lowonganId={lowongan.id}
        formEdit={{
          id: proposal.id,
          userId: proposal.userId,
          lowonganId: proposal.lowonganId,
          coverLetter: proposal.coverLetter,
          documentUrl: proposal.documentUrl,
          status: proposal.status,
        }}
        initialData={{
          userId: proposal.userId,
          lowonganId: proposal.lowonganId,
          coverLetter: proposal.coverLetter,
          documentUrl: proposal.documentUrl,
          status: proposal.status,
        }}
      />
    </div>
  );
}
