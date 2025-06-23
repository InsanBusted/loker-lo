import Hero3D from "@/components/SearchJobs/Hero/Hero3D";

const Detail = () => {
  return (
    <section className="w-[80vw] m-auto bg-white ">
      <div className="w-full rounded-2xl shadow-lg p-8 bg-black mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Teks Kiri */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tentang Platform
          </h1>
          <p className="text-white leading-relaxed text-justify mb-4">
            Platform ini dikembangkan khusus untuk{" "}
            <strong>
              menghubungkan mahasiswa dan alumni STT Nurul Fikri dengan dunia
              industri
            </strong>
            . Melalui antarmuka terintegrasi, kami menyatukan informasi lowongan
            kerja, program magang, dan portofolio digital dalam satu tempat agar
            setiap talenta STT NF dapat mempersiapkan karier sejak masa kuliah.
          </p>
          <p className="text-white leading-relaxed text-justify mb-4">
            Dengan memanfaatkan jaringan <em>stakeholder</em> kampus serta
            perusahaan mitra, platform ini menghadirkan:
          </p>
          <ul className="list-disc list-inside text-white mb-4 space-y-1">
            <li>
              Pusat lowongan kerja &amp; magang yang diverifikasi oleh kampus.
            </li>
            <li>
              Profil dan portofolio digital untuk menampilkan proyek,
              sertifikasi, dan pengalaman.
            </li>
            <li>
              Dasbor admin untuk memastikan data pengguna dan lowongan tetap
              valid serta aman.
            </li>
          </ul>
          <p className="text-white leading-relaxed text-justify">
            Kami percaya koneksi yang kuat antara mahasiswa, alumni, dan
            industri akan <strong>memperluas jejaring profesional</strong>,
            meningkatkan kesiapan kerja, dan pada akhirnya turut mendorong
            reputasi STT NF di tingkat nasional.
          </p>
        </div>

        {/* Animasi 3D dari Spline */}
        <div className="flex-1 h-[300px] md:h-[400px] hidden xl:block">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};

export default Detail;
