import Jumbotron from "@/components/Jumbotron/page";
import { ProposalTable } from "@/components/Lowongan/ProposalTable";
import { Button } from "@/components/ui/button";
import { getProposalsByBiodataSlug } from "@/lib/actions/lamar";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const proposals = await getProposalsByBiodataSlug(slug);

  if (!proposals) {
    // slug tidak ditemukan → tampilkan 404
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="mb-[7rem]">
        <Jumbotron link="Detail Proposal Saya" />
      </section>
      <section className="w-[80vw] mx-auto pt-[10rem] pb-[10rem]">
        <h2 className="text-xl font-semibold mb-4">Lamaran yang Kamu Kirim</h2>
        <ProposalTable proposals={proposals} />
        <div className="pt-6">
          <Link href={`/lowongan`}>
            <Button variant="outline">← Kembali ke Lowongan</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default page;
