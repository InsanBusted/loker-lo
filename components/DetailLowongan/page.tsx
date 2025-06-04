import prisma from "@/lib/prisma";

interface Props {
  slug: string;
}

const DetailLowonganBySlug = async ({ slug }: Props) => {
  const lowongan = await prisma.lowongan.findUnique({
    where: { slug },
    include: { bidang: true, user: true },
  });

  if (!lowongan) {
    return <div>Lowongan tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-[10rem] h-[100vh]">
      <h1 className="text-3xl font-bold mb-4">{lowongan.namaPerusahaan}</h1>
      <p className="text-sm mb-2 text-gray-600">
        Bidang: {lowongan.bidang.nama}
      </p>
      <p className="mb-4">{lowongan.deskripsi}</p>
      <p className="mb-2">
        <strong>Lokasi:</strong> {lowongan.lokasi}
      </p>
      <p className="mb-2">
        <strong>Gaji:</strong> {lowongan.gaji}
      </p>
      <p className="mb-2">
        <strong>Benefit:</strong> {lowongan.benefit.join(", ")}
      </p>
      <p className="text-xs text-gray-500">Posted by: {lowongan.user.nama}</p>
    </div>
  );
};

export default DetailLowonganBySlug;
