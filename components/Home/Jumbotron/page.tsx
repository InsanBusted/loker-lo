import { Button } from "@/components/ui/button";
import Image from "next/image";

const Jumbotron = () => {
  return (
    <div className="flex justify-center  min-h-screen px-4 md:pt-[5rem] xl:pt-[13rem] pt-[55rem]  md:px-8">
      <div className="px-4 md:px-8 py-10">
        <div className="max-w-5xl w-full bg-[#f9f9f9] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <p className="text-sm font-semibold text-gray-700 ">
              Create your profile
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to start?
            </h2>
            <Button className="mt-4 cursor-pointer">Create profile</Button>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/gambarhero.png"
                alt="Hero Image"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Jumbotron;
