import Jumbotron from "@/components/Jumbotron/page";
// import TabelDaftarPelamar from "@/components/LowonganSaya/DaftarPelamar";
import DetailLowonganPage from "@/components/LowonganSaya/DetailLowonganPage";
import { ProposalTable } from "@/components/LowonganSaya/ProposalTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const page = async ({ params }: Props) => {
  const resolvedParams = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/lamar/lowongan-saya/${resolvedParams.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const proposals = await res.json();

  return (
    <div className="flex flex-col min-h-screen">
      <section>
        <Jumbotron link="Detail Lowongan Saya" />
      </section>
      <section>
        <DetailLowonganPage params={params} />
      </section>
      <section className="w-[80vw] mx-auto pb-[10rem]">
        <ProposalTable proposals={proposals} />
        <div className="pt-6">
          <Link href={`/lowongan-saya`}>
            <Button variant="outline">← Kembali ke Lowongan</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default page;
