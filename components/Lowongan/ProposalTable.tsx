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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Building2,
  Briefcase,
  FileText,
  LocateIcon,
  ScrollText,
  DollarSign,
  Mail,
} from "lucide-react";

type Proposal = {
  id: string;
  status: "pending" | "review" | "tolak" | "terima";
  documentUrl: string;
  coverLetter: string;
  user: {
    id: string;
    email: string;
    biodata: {
      slug: string;
    } | null;
  };
  lowongan: {
    namaLowongan: string;
    slug: string;
    namaPerusahaan: string;
    deskripsi?: string;
    lokasi?: string;
    gaji?: string;
    deadline?: string;
    bidang?: { nama: string };
  };
};

export function ProposalTable({ proposals }: { proposals: Proposal[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) =>
      p.lowongan?.namaLowongan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, proposals]);

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const currentItems = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const statusBadge = (status: string) => {
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

  const handleDeleteProposal = async (id: string) => {
    const confirmed = confirm(
      "Apakah kamu yakin ingin menghapus proposal ini?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/lamar/lowongan-saya/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus proposal");
      }

      // Optional: perbarui UI tanpa reload
      window.location.reload(); // atau update state lokal
    } catch (err) {
      console.error(err);

      alert("Terjadi kesalahan saat menghapus proposal.");
    }
    console.log("Menghapus proposal ID:", id);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Cari nama lowongan..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
      </div>

      {filteredProposals.length === 0 ? (
        <p className="text-muted-foreground text-center">
          Tidak ada hasil yang cocok.
        </p>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Lowongan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((proposal) => (
                  <TableRow key={proposal.id}>
                    <TableCell>{proposal.lowongan?.namaLowongan}</TableCell>
                    <TableCell>{statusBadge(proposal.status)}</TableCell>
                    <TableCell className="flex gap-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-3xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Detail Proposal</AlertDialogTitle>
                            <AlertDialogDescription>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-sm text-left">
                                <div className="flex items-start gap-2">
                                  <Briefcase className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">
                                      Nama Lowongan
                                    </p>
                                    <p>{proposal.lowongan?.namaLowongan}</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <Building2 className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">
                                      Nama Perusahaan
                                    </p>
                                    <p>{proposal.lowongan?.namaPerusahaan}</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <ScrollText className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">Bidang</p>
                                    <p>
                                      {proposal.lowongan?.bidang?.nama || "-"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <LocateIcon className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">Lokasi</p>
                                    <p>{proposal.lowongan?.lokasi || "-"}</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2">
                                  <DollarSign className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">Gaji</p>
                                    <p>{proposal.lowongan?.gaji || "-"}</p>
                                  </div>
                                </div>

                                <div className="md:col-span-2 flex items-start gap-2">
                                  <FileText className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">
                                      Deskripsi Lowongan
                                    </p>
                                    <p className="whitespace-pre-line text-muted-foreground">
                                      {proposal.lowongan?.deskripsi || "-"}
                                    </p>
                                  </div>
                                </div>

                                <div className="md:col-span-2 flex items-start gap-2">
                                  <Mail className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">
                                      Cover Letter
                                    </p>
                                    <p className="whitespace-pre-line text-muted-foreground">
                                      {proposal.coverLetter}
                                    </p>
                                  </div>
                                </div>

                                <div className="md:col-span-2 flex items-start gap-2">
                                  <FileText className="w-4 h-4 mt-1" />
                                  <div>
                                    <p className="font-semibold">Dokumen</p>
                                    <Link
                                      href={proposal.documentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Lihat dokumen
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tutup</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href={`/lowongan/kelola-lowongan/${proposal.user.biodata?.slug}/${proposal.lowongan?.slug}/edit`}
                        >
                          Edit
                        </Link>
                      </Button>

                      {/* Delete */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                          >
                            Hapus
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Yakin ingin menghapus?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Proposal ini akan dihapus secara permanen dan
                              tidak bisa dikembalikan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteProposal(proposal.id)}
                            >
                              Hapus
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
