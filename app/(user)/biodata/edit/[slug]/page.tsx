import { notFound } from "next/navigation";
import { getBiodataByUserId } from "@/lib/actions/biodata";
import { getAllSkills } from "@/lib/actions/getAllSkills";
import { getAllBidang } from "@/lib/actions/getAllBidang";
import BiodataForm from "@/components/Biodata/BiodataForm";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth(); // user yang sedang login

  if (!userId) return notFound(); // handle jika belum login

  const biodata = await getBiodataByUserId(userId);
  const skill = await getAllSkills();
  const bidang = await getAllBidang();

  if (!biodata) return notFound();

  return (
    <div className="w-[80vw] mx-auto pt-[10rem] pb-[5rem]">
      <h1 className="text-2xl font-bold mb-6">Edit Biodata</h1>
      <section className="pt-[2rem]">
        <BiodataForm
          formEdit={{
            kategori: biodata.kategori || "mahasiswa",
            status: biodata.status || "PENDING",
            bidang: biodata.bidang.id,
            deskripsi: biodata.deskripsi,
            documentUrl: biodata.documentUrl || "",
            documentPendukung: biodata.documentPendukung || "",
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
    </div>
  );
}
