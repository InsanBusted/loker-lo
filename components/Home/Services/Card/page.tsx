import Image from "next/image";
import React from "react";

const data = [
  {
    src: "/profile.svg",
    title: "1. Create a profile",
    desc: "Highlight your skills and experience, show your portfolio, and set your ideal pay rate.",
  },
  {
    src: "/searchjob.png",
    title: "2. Search for jobs",
    desc: "Search on Talent Marketplace™ for the hourly or fixed-price work you're looking for.",
  },
  {
    src: "/proposal.png",
    title: "3. Submit a proposal",
    desc: "Set your rate and tell clients why you're the right person for the job!",
  },
  {
    src: "/contact.png",
    title: "4. Get contract",
    desc: "If the client likes your proposal they'll send you a contract to begin working.",
  },
  {
    src: "/work.png",
    title: "5. Complete the work",
    desc: "Check steps off as you finish and work with your client if you have questions.",
  },
];

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:px-[20rem] w-full">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row md:flex-col gap-4 p-4 ">
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
