import Link from "next/link";

const Footer = () => {
  return (
    <div className=" w-[80vw] m-auto pb-[3rem]">
      <div className="w-full bg-black text-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1 - Brand */}
          <div>
            <h1 className="text-xl font-bold mb-2">Lokerlo</h1>
            <p className="text-sm text-gray-300">
              Platform ini dikembangkan khusus untuk menghubungkan mahasiswa dan
              alumni STT Nurul Fikri dengan dunia industri. Melalui antarmuka
              terintegrasi, kami menyatukan informasi lowongan kerja, program
              magang, dan portofolio digital dalam satu tempat agar setiap
              talenta STT NF dapat mempersiapkan karier sejak masa kuliah.
            </p>
          </div>

          {/* Section 2 - Navigation Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Navigasi</h2>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:underline">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:underline">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/lowongan" className="hover:underline">
                  Lowongan
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3 - Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Kontak</h2>
            <p className="text-sm text-gray-300">Citayam, Depok, Indonesia</p>
            <p className="text-sm text-gray-300">Email: info@lokerlo.my.id</p>
            <p className="text-sm text-gray-300">WhatsApp: +62 896-3554-6721</p>
          </div>
        </div>

        <hr className="my-4 border-gray-600" />

        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Loker-lo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
