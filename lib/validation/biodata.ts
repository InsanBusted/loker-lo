import { z } from "zod";

export const BiodataSchema = z
  .object({
    userId: z.string().uuid(),
    documentUrl: z.string().url("URL dokumen tidak valid"),
    kategoriId: z.string().uuid(),
    tahunLulus: z.union([z.string().min(1), z.literal("")]).optional(), // akan dikonversi ke number jika perlu
    namaPerusahaan: z.string().optional(),
    lowonganId: z.string().uuid(),
    kategoriNama: z.enum(["mahasiswa", "alumni", "perusahaan"]), // input tambahan frontend
  })
  .superRefine((data, ctx) => {
    if (data.kategoriNama === "mahasiswa" && !data.tahunLulus) {
      ctx.addIssue({
        path: ["tahunLulus"],
        code: z.ZodIssueCode.custom,
        message: "Tahun lulus wajib diisi untuk kategori mahasiswa",
      });
    }

    if (data.kategoriNama === "perusahaan" && !data.namaPerusahaan) {
      ctx.addIssue({
        path: ["namaPerusahaan"],
        code: z.ZodIssueCode.custom,
        message: "Nama perusahaan wajib diisi untuk kategori perusahaan",
      });
    }
  });

export type Biodata = z.infer<typeof BiodataSchema>;
