import { PrismaClient } from "@prisma/client";
import { getEmbedding } from "@/lib/embedding";
import { lowonganIndex } from "@/lib/db/pinecone";

const prisma = new PrismaClient();

async function run() {
  const allLowongan = await prisma.lowongan.findMany();

  console.log(`Total lowongan ditemukan: ${allLowongan.length}`);

  for (const lowongan of allLowongan) {
    try {
      const combinedText = [
        lowongan.namaLowongan,
        lowongan.lokasi,
        lowongan.deskripsi,
        lowongan.kualifikasi?.join(", "),
        lowongan.tugasTanggungJawab?.join(", "),
        lowongan.kualifikasiTambahan?.join(", "),
      ]
        .filter(Boolean)
        .join("\n");

      const vector = await getEmbedding(combinedText);

      // ✅ Update upsert dengan pageContent dimasukkan ke metadata
      await lowonganIndex.upsert([
        {
          id: lowongan.id,
          values: vector,
          metadata: {
            namaLowongan: lowongan.namaLowongan,
            namaPerusahaan: lowongan.namaPerusahaan,
            pageContent: [
              `Lowongan: ${lowongan.namaLowongan}`,
              `Perusahaan: ${lowongan.namaPerusahaan}`,
              `Lokasi: ${lowongan.lokasi}`,
              `Deskripsi: ${lowongan.deskripsi || "-"}`,
              `Kualifikasi: ${lowongan.kualifikasi?.join(", ") || "-"}`,
              `Tugas: ${lowongan.tugasTanggungJawab?.join(", ") || "-"}`,
              `Tambahan: ${lowongan.kualifikasiTambahan?.join(", ") || "-"}`,
            ].join("\n"),
          },
        },
      ]);

      console.log(`✅ Success: ${lowongan.namaLowongan}`);
    } catch (err) {
      console.error(`❌ Error importing ${lowongan.id}:`, err);
    }
  }

  await prisma.$disconnect();
}

run();
