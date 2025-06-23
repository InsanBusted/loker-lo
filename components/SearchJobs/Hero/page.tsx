import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero3D from "./Hero3D";

// Load Canvas hanya di sisi klien

const HeroComponent = () => {
  return (
    <section className="w-full px-10 xl:pt-40 pt-35 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Kiri: Teks */}
        <div className="max-w-xl">
          <h1 className="xl:text-5xl text-2xl font-bold leading-tight mb-6">
            Kerjakan Pekerjaan yang Kamu Sukai dengan Caramu Sendiri
          </h1>
          <p className="xl:text-lg text-sm text-gray-600 mb-8">
            Bangun relasi yang bermakna bersama LokerLo. <br />
            Tempatmu menemukan pekerjaan yang kamu inginkan.
          </p>
          <Button className="bg-black text-white text-sm px-7 py-5 rounded-lg cursor-pointer">
            <Link href="/lowongan">Cari Pekerjaan</Link>
          </Button>
        </div>

        {/* Kanan: Animasi 3D */}
        <div className="w-full max-w-md h-[400px] rounded-[40px] overflow-hidden shadow-lg">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
