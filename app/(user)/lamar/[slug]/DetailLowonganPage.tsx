import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Building2 } from "lucide-react";

export default async function DetailLowonganPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const lowongan = await prisma.lowongan.findUnique({
    where: { slug },
    include: {
      bidang: true,
      user: {
        include: {
          biodata: true, // ambil nama perusahaan dari sini
        },
      },
    },
  });

  if (!lowongan) return notFound();

  return (
    <div className="w-[80vw] mx-auto px-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* KIRI: Info Umum */}
        <div className="lg:col-span-1 bg-black shadow-xl rounded-2xl p-6 space-y-4 h-fit">
          <h1 className="text-2xl font-bold text-white">
            {lowongan.namaLowongan}
          </h1>
          <div className="flex items-center gap-2 text-white text-sm mt-1">
            <Building2 className="w-4 h-4" />
            <span>{lowongan.namaPerusahaan}</span>
          </div>

          <div className="space-y-2 text-sm text-white">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{lowongan.lokasi}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💼</span>
              <span>{lowongan.bidang.nama}</span>
            </div>
          </div>

          <div className="bg-gray-100 text-gray-700 rounded-lg p-4 border text-sm">
            <span className="font-medium ">Gaji:</span> {lowongan.gaji}
          </div>

          <p className="text-xs text-white pt-4">
            Diposting pada:{" "}
            {new Date(lowongan.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* KANAN: Detail Lowongan */}
        <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-6 space-y-6 text-base leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Deskripsi
          </h2>
          <p>{lowongan.deskripsi}</p>

          {lowongan.kualifikasi?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Kualifikasi Pekerjaan
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {lowongan.kualifikasi.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {lowongan.tugasTanggungJawab?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Tugas dan Tanggung Jawab
              </h2>
              <ol className="list-decimal pl-6 space-y-1">
                {lowongan.tugasTanggungJawab.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
          )}

          {lowongan.kualifikasiTambahan?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Kualifikasi Tambahan
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {lowongan.kualifikasiTambahan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
