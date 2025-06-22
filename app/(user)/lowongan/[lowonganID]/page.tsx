import Jumbotron from "@/components/Jumbotron/page";
import DetailLowonganPage from "@/components/Lowongan/DetailLowonganPage";

type Props = { params: Promise<{ lowonganID: string }> };

const page = async ({ params }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <section >
        <Jumbotron link="lowongan" />
      </section>
      <section className="mb-[5rem]">
        <DetailLowonganPage params={params} />
      </section>
    </div>
  );
};

export default page;
