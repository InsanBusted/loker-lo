import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DetailBiodata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const biodata = await prisma.biodata.findUnique({
    where: { slug },
    include: { bidang: true, skills: true },
  });

  const perusahaan = biodata?.kategori === "perusahaan";

  if (!biodata) return notFound();

  return (
    <div className="w-[80vw] mx-auto pt-[10rem]">
      <div className="grid md:grid-cols-3  gap-10 p-6">
        {/* Kiri: Profil */}
        <div className="col-span-2">
          <div className="flex gap-6 items-start">
            <Image
              src={biodata.imgProfile}
              alt={biodata.namaLengkap?.toString() || ""}
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
            <div>
              <h1 className="text-3xl font-bold">{biodata.namaLengkap}</h1>
              <h1 className="text-3xl font-bold">{biodata.namaPerusahaan}</h1>
              <p className="text-muted-foreground text-sm capitalize">
                Kategori: {biodata.kategori}{" "}
                {biodata.tahunLulus && ` - Lulus ${biodata.tahunLulus}`}
              </p>

              {!perusahaan && (
                <div className="mt-4">
                  <Link
                    href={biodata.documentUrl?.toString() || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
            <div className="max-w-2xl">
              <p className="text-gray-700 whitespace-pre-line">
                {biodata.deskripsi}
              </p>
            </div>
          </div>
        </div>

        {/* Kanan: Bidang & Skill */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Bidang</h2>
            <Badge className="text-sm p-[1rem]">
              {biodata.bidang?.nama || "Tidak ada bidang"}
            </Badge>
          </div>

          {!perusahaan && (
            <div>
              <h2 className="text-xl font-semibold mb-[2rem]">Skills</h2>
              {biodata.skills.length > 0 ? (
                <div className="grid grid-cols-3 xl:grid-cols-4 xl:gap-5 gap-[4rem]">
                  <TooltipProvider>
                    {biodata.skills.map((skill) => (
                      <Tooltip key={skill.id}>
                        <TooltipTrigger className="px-3 py-2 bg-muted rounded-md flex justify-center items-center text-sm font-medium hover:bg-primary hover:text-white transition-all">
                          {skill.nama}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.nama}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Belum ada skill ditambahkan.
                </p>
              )}
            </div>
          )}

          <Link href={`/biodata/edit/${biodata.slug}`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailBiodata;
