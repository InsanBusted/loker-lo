"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const PerusahaanRedirectAlert = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      router.push("/"); // ⬅️ Redirect setelah alert ditutup
    }
  }, [open, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Akses Ditolak</AlertDialogTitle>
        <AlertDialogDescription>
          Akun perusahaan tidak dapat melamar lowongan kerja.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)}>Kembali ke Beranda</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PerusahaanRedirectAlert;
