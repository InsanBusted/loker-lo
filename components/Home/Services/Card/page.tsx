import Image from "next/image";
import React from "react";

const data = [
  {
    src: "/profile.svg",
    title: "1. Buat Profil",
    desc: "Tampilkan keahlian dan pengalamanmu, perlihatkan portofolio, dan tentukan tarif idealmu.",
  },
  {
    src: "/searchjob.png",
    title: "2. Cari Pekerjaan",
    desc: "Cari pekerjaan per jam atau harga tetap di Talent Marketplace™ yang sesuai denganmu.",
  },
  {
    src: "/proposal.png",
    title: "3. Kirim Proposal",
    desc: "Tentukan tarifmu dan jelaskan kepada klien mengapa kamu orang yang tepat untuk pekerjaan itu!",
  },
  {
    src: "/contact.png",
    title: "4. Dapatkan Kontrak",
    desc: "Jika klien menyukai proposalmu, mereka akan mengirimkan kontrak untuk memulai pekerjaan.",
  },
  {
    src: "/work.png",
    title: "5. Selesaikan Pekerjaan",
    desc: "Centang setiap langkah saat kamu menyelesaikannya dan komunikasikan dengan klien jika ada pertanyaan.",
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:px-[20rem] w-full">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row md:flex-col gap-4 p-4">
          <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] shrink-0">
            <Image
              src={item.src}
              alt={item.title}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Teks di kanan (mobile) / bawah (md+) */}
          <div className="text-left">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
