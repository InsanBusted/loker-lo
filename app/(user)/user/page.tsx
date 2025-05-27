import { getOrCreateUser } from "@/app/queris/getOrCreateUser";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  return (
    <div>
      <h1>Halo, {user.nama}</h1>
    </div>
  );
}
