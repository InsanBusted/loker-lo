import Image from "next/image";

const VisiMisi = () => {
  return (
    <section className="w-[80vw] xl:mt-0 mt-[20rem] mb-[50rem] m-auto bg-white">
      <div className="w-full p-8 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Visi & Misi Kami
          </h1>
          <p className="text-black leading-relaxed text-justify mb-4">
            <strong>Visi kami</strong> adalah menjadi platform koneksi utama
            antara mahasiswa dan alumni STT Nurul Fikri dengan industri untuk
            membuka peluang karier yang lebih luas, mempererat kolaborasi, serta
            mendukung pengembangan potensi profesional sejak di bangku kuliah.
          </p>
          <p className="text-black leading-relaxed text-justify mb-4">
            <strong>Misi kami</strong> meliputi:
          </p>
          <ul className="list-disc list-inside text-black mb-4">
            <li>
              Menyediakan platform terintegrasi yang menampilkan informasi
              lowongan kerja dan magang secara terpusat.
            </li>
            <li>
              Membuka ruang kolaborasi dan mentoring antara mahasiswa dan alumni
              untuk saling berbagi wawasan dan pengalaman karier.
            </li>
            <li>
              Memperkuat jejaring profesional antara civitas akademika STT Nurul
              Fikri dan dunia industri yang telah bekerjasama.
            </li>
          </ul>
          <p className="text-black leading-relaxed text-justify">
            Kami percaya bahwa dengan koneksi yang kuat antara mahasiswa,
            alumni, dan dunia industri, STT Nurul Fikri dapat menciptakan
            ekosistem karier yang mendukung pertumbuhan dan kesiapan profesional
            lulusan secara berkelanjutan.
          </p>
        </div>

        {/* Gambar Kanan */}
        <div className="flex-1 flex justify-center py-8">
          <Image
            src="/work.png"
            alt="Tentang Kami"
            width={250}
            height={250}
            className="max-w-xs w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
