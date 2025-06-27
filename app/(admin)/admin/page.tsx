import { getUserBiodataStatus } from "@/lib/actions/checkUserBiodata";
import { redirect } from "next/navigation";

export default async function Page() {
  const { role } = await getUserBiodataStatus();

  if (role !== "ADMIN") {
    redirect("/loker-lo");
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Selamat Datang</h1>
      <p className="text-muted-foreground">Halo Admin!</p>
    </div>
  );
}
