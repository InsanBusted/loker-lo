import DetailBiodata from "./DetailBiodata";

type Props = { params: Promise<{ slug: string }> };

const page = ({ params }: Props) => {
  return <DetailBiodata params={params}/>;
};

export default page;
