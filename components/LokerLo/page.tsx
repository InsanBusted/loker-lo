"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero/page";
import Jumbotron from "@/components/Home/Jumbotron/page";
import Service from "@/components/Home/Services/page";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  hasBiodata: boolean;
  userId: string | null;
  role: "USER" | "ADMIN";
};

export default function LokerLo({ hasBiodata, userId, role }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (role !== "ADMIN" && !hasBiodata) {
      setOpen(true);
    }
  }, [hasBiodata, role]);
  return (
    <div>
      <main>
        <section className="h-[100vh]">
          <Hero />
        </section>
        <section className="h-[80vh]">
          <Service />
        </section>
        <section >
          <Jumbotron />
        </section>
        <section className="h-[10vh] xl:h-[0]"></section>
      </main>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lengkapi Biodata Anda</AlertDialogTitle>
            <AlertDialogDescription>
              Silakan lengkapi biodata Anda terlebih dahulu untuk melanjutkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {userId && (
              <Link href="/biodata" passHref>
                <AlertDialogAction asChild>
                  <Button className="w-full">Lengkapi Sekarang</Button>
                </AlertDialogAction>
              </Link>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
