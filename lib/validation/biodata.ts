import { z } from "zod";

export const BiodataSchema = z
  .object({
    documentUrl: z.string().url("URL dokumen tidak valid"),
    imgProfile: z.string().url("URL profil tidak valid"),
    deskripsi: z.string(),
    kategori: z.enum(["mahasiswa", "alumni", "perusahaan"]),
    bidangId: z.number().int().positive(),
    tahunLulus: z.union([z.string().min(1), z.literal("")]).optional(),
    namaPerusahaan: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (
      data.kategori === "mahasiswa" &&
      (!data.tahunLulus || data.tahunLulus === "")
    ) {
      ctx.addIssue({
        path: ["tahunLulus"],
        code: z.ZodIssueCode.custom,
        message: "Tahun lulus wajib diisi untuk kategori mahasiswa",
      });
    }

    if (
      data.kategori === "perusahaan" &&
      (!data.namaPerusahaan || data.namaPerusahaan === "")
    ) {
      ctx.addIssue({
        path: ["namaPerusahaan"],
        code: z.ZodIssueCode.custom,
        message: "Nama perusahaan wajib diisi untuk kategori perusahaan",
      });
    }
  });

export type Biodata = z.infer<typeof BiodataSchema>;
