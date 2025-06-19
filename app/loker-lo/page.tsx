import LokerLo from "@/components/LokerLo/page";
import { getOrCreateUser } from "../queris/getOrCreateUser";
import { getUserBiodataStatus } from "@/lib/actions/checkUserBiodata";

const Page = async () => {
  await getOrCreateUser();
  const { hasBiodata, userId } = await getUserBiodataStatus();

  return <LokerLo hasBiodata={hasBiodata} userId={userId} />;
};

export default Page;
