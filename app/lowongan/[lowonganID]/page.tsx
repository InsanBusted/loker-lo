import DetailLowonganBySlug from "@/components/DetailLowongan/page";
import Header from "@/components/Header/page";
import Footer from "@/components/ui/Footer/page";
import { FC } from "react";

interface PageProps {
  params: {
    lowonganID: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <DetailLowonganBySlug slug={params.lowonganID} />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
