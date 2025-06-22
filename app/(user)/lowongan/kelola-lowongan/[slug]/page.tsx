import WithBiodataStatusGuard from "@/components/Auth/BiodataStatus";
import Jumbotron from "@/components/Jumbotron/page";
import { ProposalTable } from "@/components/Lowongan/ProposalTable";
import { Button } from "@/components/ui/button";
import { getProposalsByBiodataSlug } from "@/lib/actions/lamar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const { userId } = await auth();

  if (!userId) return notFound(); // ✅ Tambahkan ini

  const proposals = await getProposalsByBiodataSlug(slug);

  if (!proposals) {
    notFound();
  }

  const biodata = await prisma.biodata.findFirst({
    where: { userId }, // ✅ Aman karena userId sudah dicek
    select: { status: true },
  });

  return (
    <WithBiodataStatusGuard status={biodata?.status}>
      <div className="flex flex-col min-h-screen">
        <section className="mb-[7rem]">
          <Jumbotron link="Detail Proposal Saya" />
        </section>
        <section className="w-[80vw] mx-auto pt-[10rem] pb-[10rem]">
          <h2 className="text-xl font-semibold mb-4">
            Lamaran yang Kamu Kirim
          </h2>
          <ProposalTable proposals={proposals} />
          <div className="pt-6">
            <Link href={`/lowongan`}>
              <Button variant="outline">← Kembali ke Lowongan</Button>
            </Link>
          </div>
        </section>
      </div>
    </WithBiodataStatusGuard>
  );
};

export default page;
