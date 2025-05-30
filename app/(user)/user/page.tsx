import { getOrCreateUser } from "@/app/queris/getOrCreateUser";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  return (
    <div>
      <h1>Halo, {user.nama}</h1>
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
        }}
      />
    </div>
  );
}
