import BiodataForm from "@/components/Biodata/BiodataForm";
import { getBidang, getSkill } from "@/lib/actions/biodata";

export default async function Page() {
  const bidangList = await getBidang();
  const skillList = await getSkill();

  return (
    <div className="w-[80vw] mx-auto">
      <main className="w-full p-4">
        <h1 className="text-2xl font-bold mb-6">Tambah Biodata</h1>
        <section className="pt-[10rem]">
          <BiodataForm skill={skillList} bidang={bidangList} />
        </section>
      </main>
    </div>
  );
}
