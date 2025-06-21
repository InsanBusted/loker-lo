import Link from "next/link";

const Banner = () => {
  return (
    <div className="py-20 mt-[10rem] bg-gray-50 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Temukan pekerjaan impianmu 🎯
      </h2>
      <p className="text-gray-600 mb-8">
        Jelajahi lowongan kerja di bidang teknologi yang sesuai dengan passion
        dan skill-mu.
      </p>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {[
          "Web Development",
          "UI/UX Design",
          "Artificial Intelligence",
          "DevOps",
          "Cybersecurity",
          "Mobile App",
        ].map((category) => (
          <Link
            key={category}
            href={`/search?q=${encodeURIComponent(category)}`}
            className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-blue-100 transition text-sm"
          >
            {category}
          </Link>
        ))}
      </div>

     
    </div>
  );
};

export default Banner;
