import { z } from "zod";


export const KategoriSchema = z.object({
  nama: z
    .enum(["mahasiswa", "alumni"], {
      required_error: "Nama kategori wajib diisi",
      invalid_type_error: "Kategori tidak valid",
    }),
});

export type Kategori = z.infer<typeof KategoriSchema>;