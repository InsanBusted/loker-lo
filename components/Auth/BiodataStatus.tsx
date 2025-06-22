// components/auth/WithBiodataStatusGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  status?: string;
  children: React.ReactNode;
};

export default function WithBiodataStatusGuard({ status, children }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "PENDING") {
      setOpen(true);
    }
  }, [status]);

  if (status === "PENDING") {
    return (
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Akses Ditolak</AlertDialogTitle>
            <AlertDialogDescription>
              Biodata kamu masih <strong>belum diverifikasi (PENDING)</strong>.
              Silakan tunggu verifikasi dari admin sebelum melamar lowongan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setOpen(false);
                router.push("/lowongan");
              }}
            >
              Kembali ke Lowongan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
}
