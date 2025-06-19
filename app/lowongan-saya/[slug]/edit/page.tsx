import LowonganForm from "@/components/Lowongan/lowonganform";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditLowonganPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();
  const resolvedParams = await params;

  if (!userId) {
    return (
      <p className="text-center mt-10">
        Silakan login untuk mengedit lowongan.
      </p>
    );
  }

  const lowongan = await prisma.lowongan.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!lowongan || lowongan.userId !== userId) {
    return notFound();
  }

  return (
    <div className="w-[80vw] mx-auto pt-[10rem]">
      <h1 className="text-2xl font-bold mb-6">Edit Lowongan</h1>
      <div className="pb-[5rem]">
        <LowonganForm
          userId={userId}
          initialData={{
            ...lowongan,
            id: lowongan.id, // pastikan id ikut
          }}
        />
      </div>
    </div>
  );
}
