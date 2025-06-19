import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditProposalForm } from "@/components/LowonganSaya/EditFormStatus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Jumbotron from "@/components/Jumbotron/page";

type DetailPelamarProps = {
  params: Promise<{
    slug: string; // slug lowongan
    slugPelamar: string; // slug biodata
  }>;
};

export default async function DetailPelamarPage({
  params,
}: DetailPelamarProps) {
  const resolvedParams = await params;

  const proposal = await prisma.proposal.findFirst({
    where: {
      lowongan: {
        slug: resolvedParams.slug,
      },
      user: {
        biodata: {
          slug: resolvedParams.slugPelamar,
        },
      },
    },
    include: {
      user: {
        include: {
          biodata: true,
        },
      },
      lowongan: true,
    },
  });

  if (!proposal) return notFound();

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "review":
        return <Badge variant="default">Review</Badge>;
      case "terima":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Diterima
          </Badge>
        );
      case "tolak":
      default:
        return <Badge variant="destructive">Ditolak</Badge>;
    }
  };

  return (
    <div className="w-[80vw] mx-auto">
      <div>
        <Jumbotron link="Detail Pelamar" />
      </div>
      <div className=" pb-10 pt-[20rem] space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Detail Proposal</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kiri: Detail Proposal */}
            <div className="border rounded p-6 space-y-4 bg-white shadow">
              <h2 className="text-lg font-semibold">Informasi Pelamar</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Nama:</strong>{" "}
                  {proposal.user.biodata?.namaLengkap ?? "Tanpa Nama"}
                </p>
                <p>
                  <strong>Email:</strong> {proposal.user.email}
                </p>
                <p>
                  <strong>Cover Letter:</strong> {proposal.coverLetter}
                </p>
                <p>
                  <strong>Dokumen:</strong>{" "}
                  <a
                    href={proposal.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat Dokumen
                  </a>
                </p>
                <p>
                  <strong>Status Saat Ini:</strong>{" "}
                  {statusBadge(proposal.status)}
                </p>
              </div>
            </div>

            {/* Kanan: Form Edit Status */}
            <div className="border rounded p-6 bg-white shadow">
              <h2 className="text-lg font-semibold mb-4">
                Edit Status Pelamar
              </h2>
              <EditProposalForm
                proposalId={proposal.id}
                defaultStatus={proposal.status}
              />
            </div>
          </div>

          <div className="pt-6">
            <Link href={`/lowongan-saya/${resolvedParams.slug}`}>
              <Button variant="outline">← Kembali ke Lowongan</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
