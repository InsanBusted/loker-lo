import Jumbotron from "@/components/Jumbotron/page";
import DetailLowonganPage from "@/components/Lowongan/DetailLowonganPage";

type Props = { params: Promise<{ lowonganID: string }> };

const page = async ({ params }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="mb-[7rem]">
        <Jumbotron link="lowongan" />
      </section>
      <section>
        <DetailLowonganPage params={params} />
      </section>
    </div>
  );
};

export default page;
