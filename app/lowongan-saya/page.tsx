"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Jumbotron from "@/components/Jumbotron/page";

interface Lowongan {
  id: string;
  slug: string;
  namaLowongan: string;
  lokasi: string;
  bidang: {
    nama: string;
  };
}

const DaftarLowongan = () => {
  const [lowongans, setLowongans] = useState<Lowongan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLowongans = async () => {
      try {
        const res = await fetch("/api/lowongan");
        const data = await res.json();
        setLowongans(data);
      } catch (error) {
        console.error("Gagal mengambil data lowongan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLowongans();
  }, []);

  return (
    <div className="w-[80vw] h-[100vh] mx-auto  px-4">
      <section className="mb-[20rem]">
        <Jumbotron link="daftar lowongan" />
      </section>
      <div className="max-w-7xl mt-[5rem] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              <div className="flex flex-wrap justify-between">
                <h1>Daftar Lowongan Saya</h1>
                <Button>
                  <Link href={"/lowongan-saya/buat"}>Buat Lowongan</Link>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 items-center gap-4 border-b py-3"
                  >
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                ))}
              </div>
            ) : lowongans.length === 0 ? (
              <p className="text-muted-foreground">Tidak ada lowongan.</p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nama Lowongan</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Bidang</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowongans.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="font-medium">
                          {l.namaLowongan}
                        </TableCell>
                        <TableCell>{l.lokasi}</TableCell>
                        <TableCell>{l.bidang.nama}</TableCell>
                        <TableCell>
                          <Link
                            href={`/lowongan-saya/${l.slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            <Button className="cursor-pointer">Detail</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DaftarLowongan;
