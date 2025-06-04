import DetailLowonganBySlug from "@/components/DetailLowongan/page";
import Header from "@/components/Header/page";
import Footer from "@/components/ui/Footer/page";


const Page = async ({ params }: { params: Promise<{ lowonganID: string }> }) => {
  const lowonganID  = (await params).lowonganID;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <DetailLowonganBySlug slug={lowonganID} />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
