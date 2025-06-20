import LokerLo from "@/components/LokerLo/page";
import { getOrCreateUser } from "../queris/getOrCreateUser";
import { getUserBiodataStatus } from "@/lib/actions/checkUserBiodata";

const Page = async () => {
  await getOrCreateUser();
  const { hasBiodata, userId, role } = await getUserBiodataStatus();
  const validRole = role === "ADMIN" || role === "USER" ? role : "USER";

  return <LokerLo hasBiodata={hasBiodata} userId={userId} role={validRole} />;
};

export default Page;
