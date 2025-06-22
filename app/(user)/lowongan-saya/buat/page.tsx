import LowonganForm from "@/components/Lowongan/lowonganform";
import { auth } from "@clerk/nextjs/server";

export default async function BuatLowonganPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <p className="text-center mt-10">Silakan login untuk membuat lowongan.</p>
    );
  }

  return (
    <div className="w-[80vw] mx-auto pt-[10rem]">
      <h1 className="text-2xl font-bold mb-6">Buat Lowongan Baru</h1>
      <div className="pb-[5rem]">
        <LowonganForm userId={userId} />
      </div>
    </div>
  );
}
