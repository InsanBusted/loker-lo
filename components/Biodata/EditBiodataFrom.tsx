import { notFound } from "next/navigation";
import BiodataForm from "./BiodataForm";
import { getBiodata } from "@/lib/actions/biodata";
import { getAllSkills } from "@/lib/actions/getAllSkills";
import { getAllBidang } from "@/lib/actions/getAllBidang";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const biodata = await getBiodata(params.slug);
  const skill = await getAllSkills();
  const bidang = await getAllBidang();

  if (!biodata) return notFound();

  return (
    <div>
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Edit Biodata</h1>
        <section className="pt-[2rem]">
          <BiodataForm
            formEdit={{
              kategori: biodata.kategori || "mahasiswa",
              status: biodata.status || "PENDING",
              bidang: biodata.bidang.id,
              deskripsi: biodata.deskripsi,
              documentUrl: biodata.documentUrl || "",
              imgProfile: biodata.imgProfile,
              namaLengkap: biodata.namaLengkap || "",
              namaPerusahaan: biodata.namaPerusahaan || "",
              tahunLulus: biodata.tahunLulus || undefined,
              skill: biodata.skills.map((s) => s.id),
            }}
            bidang={bidang}
            skill={skill}
          />
        </section>
      </main>
    </div>
  );
}
