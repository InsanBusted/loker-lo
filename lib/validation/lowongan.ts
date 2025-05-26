import { z } from "zod";

export const LowonganSchema = z.object({
  namaPerusahaan: z.string().min(1, "Nama perusahaan wajib diisi"),
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  bidangId: z.string().uuid(),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  gaji: z.string().min(1, "Gaji wajib diisi"),
  benefit: z
    .array(z.string().min(1, "Benefit tidak boleh kosong"))
    .max(7, "Maksimal 7 benefit"),
});

export type Lowongan = z.infer<typeof LowonganSchema>;