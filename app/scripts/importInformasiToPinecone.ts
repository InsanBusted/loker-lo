import { getEmbedding } from "@/lib/embedding";
import { lowonganIndex } from "@/lib/db/pinecone";

async function run() {
  const pageContent = [
    "Cara Melamar Lowongan:",
    "",
    "1. Login terlebih dahulu sebagai Mahasiswa atau Alumni.",
    "2. Lengkapi biodata di halaman Biodata.",
    "3. Tunggu validasi dari admin.",
    "4. Pergi ke halaman Lowongan.",
    "5. Klik lowongan yang ingin dilamar.",
    "6. Klik tombol 'Lamar Sekarang'.",
    "7. Lengkapi form lamaran kerja.",
    "",
    "Pastikan biodata kamu lengkap agar bisa mengakses fitur ini.",
  ].join("\n");

  try {
    const vector = await getEmbedding(pageContent);

    await lowonganIndex.upsert([
      {
        id: "info-cara-melamar",
        values: vector,
        metadata: {
          type: "informasi",
          topik: "cara-melamar",
          pageContent,
        },
      },
    ]);

    console.log("✅ Informasi 'cara melamar' berhasil dimasukkan ke Pinecone.");
  } catch (err) {
    console.error("❌ Gagal mengimpor informasi 'cara melamar':", err);
  }
}

run();
