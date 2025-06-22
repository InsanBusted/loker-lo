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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { useTransition } from "react";

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
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    <div className="w-[80vw] h-[100vh] mx-auto px-4">
      <section>
        <Jumbotron link="daftar lowongan" />
      </section>
      <div className="max-w-7xl mt-[5rem] mb-[10rem] mx-auto">
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
                        <TableCell className="space-x-2">
                          <Link href={`/lowongan-saya/${l.slug}`}>
                            <Button variant="outline">Detail</Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                onClick={() => setSelectedId(l.id)}
                                disabled={isPending}
                              >
                                {isPending && selectedId === l.id
                                  ? "Menghapus..."
                                  : "Hapus"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Yakin ingin menghapus?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tindakan ini tidak dapat dibatalkan. Data
                                  lowongan akan dihapus secara permanen.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    if (!user?.id || !selectedId) return;

                                    startTransition(async () => {
                                      try {
                                        const res = await fetch(
                                          `/api/lowongan/${user.id}`,
                                          {
                                            method: "DELETE",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                            body: JSON.stringify({
                                              id: selectedId,
                                            }),
                                          }
                                        );

                                        if (!res.ok) {
                                          const error = await res.json();
                                          console.error(error.error);
                                        } else {
                                          setLowongans((prev) =>
                                            prev.filter(
                                              (lowongan) =>
                                                lowongan.id !== selectedId
                                            )
                                          );
                                        }
                                      } catch (err) {
                                        console.error("Gagal menghapus:", err);
                                      } finally {
                                        setSelectedId(null);
                                      }
                                    });
                                  }}
                                  disabled={isPending}
                                >
                                  {isPending ? "Menghapus..." : "Ya, Hapus"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
