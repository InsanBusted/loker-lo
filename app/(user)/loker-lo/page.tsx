import LokerLo from "@/components/LokerLo/page";
import { getOrCreateUser } from "../queris/getOrCreateUser";
import { getUserBiodataStatus } from "@/lib/actions/checkUserBiodata";
import { redirect } from "next/navigation";

const Page = async () => {
  await getOrCreateUser();
  const { hasBiodata, userId, role } = await getUserBiodataStatus();
  const validRole = role === "ADMIN" || role === "USER" ? role : "USER";

  // Redirect ke /admin jika role adalah ADMIN
  if (role === "ADMIN") {
    redirect("/admin");
  }

  return <LokerLo hasBiodata={hasBiodata} userId={userId} role={validRole} />;
};

export default Page;
