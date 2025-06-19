"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type Proposal = {
  id: string;
  status: "pending" | "review" | "tolak" | "terima";
  documentUrl: string;
  user: {
    id: string;
    email: string;
    biodata?: {
      namaLengkap?: string;
      slug: string;
    };
  };
  lowongan: {
    slug: string;
  };
};

const statusBadge = (status: Proposal["status"]) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "review":
      return <Badge variant="default">Review</Badge>;
    case "terima":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">
          Diterima
        </Badge>
      );
    case "tolak":
    default:
      return <Badge variant="destructive">Ditolak</Badge>;
  }
};

export function ProposalTable({ proposals }: { proposals: Proposal[] }) {
  return (
    <div className="rounded-md border">
      <h1 className="p-5 text-2xl font-bold">Daftar Pelamar</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dokumen</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {" "}
                {item.user.biodata?.namaLengkap ?? "Tanpa Nama"}
              </TableCell>
              <TableCell>{item.user.email}</TableCell>
              <TableCell>{statusBadge(item.status)}</TableCell>
              <TableCell>
                <a
                  href={item.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  Lihat <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </TableCell>
              <TableCell>
                <Link
                  href={`/lowongan-saya/${item.lowongan.slug}/pelamar/${item.user.biodata?.slug}`}
                >
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </div>
  );
}
