import { z } from "zod";

export const lowonganFormSchema = z.object({
  id: z.string().optional(), // untuk edit
  namaPerusahaan: z.string().optional(),
  namaLowongan: z.string().min(1, "Nama Lowongan wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  bidangId: z.string().min(1, "Bidang wajib dipilih"),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  gaji: z.string().min(1, "Gaji wajib diisi"),
  benefit: z.array(z.string()).optional(),
  kualifikasi: z.array(z.string()).optional(),
  tugasTanggungJawab: z.array(z.string()).optional(),
  kualifikasiTambahan: z.array(z.string()).optional(),
});

export type LowonganSchema = z.infer<typeof lowonganFormSchema>;
