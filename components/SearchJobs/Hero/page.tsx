import Image from "next/image";

const Hero = () => {
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
        </div>

        {/* Kanan: Gambar */}
        <div className="relative w-full max-w-lg h-[400px] rounded-[40px] overflow-hidden">
          <Image
            src="/gambarhero.png"
            alt="Hero"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
