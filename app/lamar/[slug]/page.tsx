import React from "react";
import DetailLowonganPage from "./DetailLowonganPage";
import LamarForm from "@/components/Lamar/LamarForm";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type Props = { params: Promise<{ slug: string }> };

const LamarLowongan = async ({ params }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return <p className="text-center mt-10">Silakan login untuk melamar.</p>;
  }
  const resolvedParams = await params;

  const lowongan = await prisma.lowongan.findUnique({
    where: { slug: resolvedParams.slug },
    select: { id: true },
  });

  if (!lowongan) {
    return <p className="text-center mt-10">Lowongan tidak ditemukan.</p>;
  }

  
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-[10rem] mx-auto">
        <h1 className="text-2xl font-bold">Lamar Lowongan</h1>
        <DetailLowonganPage params={params} />
      </section>
      <section>
        <LamarForm userId={userId} lowonganId={lowongan.id} />
      </section>
    </div>
  );
};

export default LamarLowongan;
