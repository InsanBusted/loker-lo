import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero3D from "./Hero3D";

// Load Canvas only in client

const HeroComponent = () => {
  return (
    <section className="w-full px-10 xl:pt-40 pt-35 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Kiri: Text */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Do the work you love, <br /> your way
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Build rewarding relationships in the world&apos;s Work Marketplace.
            Your home for the work you want.
          </p>
          <Button className="bg-black text-white text-sm px-7 py-5 rounded-lg cursor-pointer">
            <Link href="/lowongan">Search Job</Link>
          </Button>
        </div>

        {/* Kanan: 3D Animasi */}
        <div className="w-full max-w-md h-[400px] rounded-[40px] overflow-hidden shadow-lg">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
