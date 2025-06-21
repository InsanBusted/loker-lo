import React from "react";
import LamarForm from "@/components/Lamar/LamarForm";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import Jumbotron from "@/components/Jumbotron/page";
import DetailLowonganPage from "./DetailLowonganPage";

type Props = { params: Promise<{ slug: string }> };

const LamarLowongan = async ({ params }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-lg font-semibold text-gray-700">
          Silakan login untuk melamar lowongan.
        </p>
        <SignedOut>
          <Button className="font-semibold text-white">
            <Link href="/sign-up">Login</Link>
          </Button>
        </SignedOut>
      </div>
    );
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
    <div className="flex flex-col min-h-screen ">
      <Jumbotron link="Lamar Lowongan" />
      <section className="pt-[5rem] mx-auto">
        <DetailLowonganPage params={params} />
      </section>
      <section className="py-[5rem]">
        <LamarForm userId={userId} lowonganId={lowongan.id} />
      </section>
    </div>
  );
};

export default LamarLowongan;
