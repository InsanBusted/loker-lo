import DetailLowonganPage from "./DetailLowonganPage";

type Props = { params: Promise<{ lowonganID: string }> };

const page = async ({ params }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <DetailLowonganPage params={params} />
    </div>
  );
};

export default page;
