"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

interface Biodata {
  id: string;
  user: string;
  namaLengkap: string | null;
  namaPerusahaan: string | null;
  email: string;
  kategori: string | null;
  status: string;
  bidang: { nama: string };
  documentPendukung: string | null;
}

export default function Page() {
  const [biodataList, setBiodataList] = useState<Biodata[]>([]);
  const [selected, setSelected] = useState<Biodata | null>(null);
  const [status, setStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/api/biodata/all")
      .then((res) => res.json())
      .then((data) => setBiodataList(data));
  }, []);

  const handleSave = async () => {
    if (!selected) return;
    const res = await fetch(`/api/biodata/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success("Status berhasil diperbarui");
      setBiodataList((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, status } : item
        )
      );
      setSelected(null);
    } else {
      toast.error("Gagal memperbarui status");
    }
  };

  const filteredList = biodataList.filter((item) => {
    const nama =
      item.kategori === "perusahaan"
        ? item.namaPerusahaan
        : item.namaLengkap;
    return nama?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Daftar Biodata</h1>

      <input
        type="text"
        placeholder="Cari berdasarkan nama lengkap atau perusahaan"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset ke halaman pertama saat pencarian
        }}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Bidang</TableHead>
            <TableHead>Dokumen Pendukung</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.kategori === "perusahaan"
                  ? item.namaPerusahaan
                  : item.namaLengkap}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.kategori}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.bidang.nama}</TableCell>
              <TableCell>
                {item.documentPendukung === "tidak perlu dokumen" ? (
                  "tidak perlu dokumen"
                ) : item.documentPendukung ? (
                  <Link
                    href={item.documentPendukung}
                    target="_blank"
                    className="text-blue-600"
                    rel="noopener noreferrer"
                  >
                    Lihat
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelected(item);
                    setStatus(item.status);
                  }}
                >
                  Edit Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Dialog Edit Status */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Status Biodata</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
