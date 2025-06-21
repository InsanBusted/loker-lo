import { z } from "zod";

const currentYear = new Date().getFullYear();

export const BiodataSchema = z
  .object({
    documentUrl: z
      .string()
      .url("URL dokumen tidak valid")
      .optional()
      .or(z.literal("")),
    documentPendukung: z
      .string()
      .url("URL dokumen tidak valid")
      .optional()
      .or(z.literal("")),
    imgProfile: z
      .string()
      .url("URL profil tidak valid")
      .nonempty("URL profil wajib diisi"),
    deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
    namaLengkap: z.string().optional(),
    kategori: z.enum(["mahasiswa", "alumni", "perusahaan"]),
    status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
    bidang: z.string().min(1, "Bidang wajib diisi"),
    skill: z.array(z.number()).optional(),
    tahunLulus: z
      .number()
      .int()
      .positive()
      .gte(1900, "Tahun lulus minimal 1900")
      .lte(currentYear, `Tahun lulus tidak boleh lebih dari ${currentYear}`)
      .optional(),
    namaPerusahaan: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validasi tahun lulus untuk alumni
    if (
      data.kategori === "alumni" &&
      (!data.tahunLulus || data.tahunLulus === 0)
    ) {
      ctx.addIssue({
        path: ["tahunLulus"],
        code: z.ZodIssueCode.custom,
        message: "Tahun lulus wajib diisi untuk alumni",
      });
    }

    // Validasi nama perusahaan untuk kategori perusahaan
    if (
      data.kategori === "perusahaan" &&
      (!data.namaPerusahaan || data.namaPerusahaan.trim() === "")
    ) {
      ctx.addIssue({
        path: ["namaPerusahaan"],
        code: z.ZodIssueCode.custom,
        message: "Nama perusahaan wajib diisi untuk kategori perusahaan",
      });
    }

    // Validasi nama lengkap untuk mahasiswa dan alumni
    if (
      (data.kategori === "mahasiswa" || data.kategori === "alumni") &&
      (!data.namaLengkap || data.namaLengkap.trim() === "")
    ) {
      ctx.addIssue({
        path: ["namaLengkap"],
        code: z.ZodIssueCode.custom,
        message: "Nama lengkap wajib diisi untuk mahasiswa dan alumni",
      });

      ctx.addIssue({
        path: ["documentPendukung"],
        code: z.ZodIssueCode.custom,
        message:
          "Document Pendukung wajib diisi untuk mahasiswa dan alumni (BUKTI KTM/BUKTI PENDUKUNG)",
      });
    }

    // Validasi documentUrl: wajib diisi untuk mahasiswa dan alumni
    if (
      data.kategori !== "perusahaan" &&
      (!data.documentUrl || data.documentUrl.trim() === "")
    ) {
      ctx.addIssue({
        path: ["documentUrl"],
        code: z.ZodIssueCode.custom,
        message: "Document Portofolio wajib diisi untuk mahasiswa dan alumni",
      });
    }
  });

export const editBiodataSchema = z
  .object({
    documentUrl: z
      .string()
      .url("URL dokumen tidak valid")
      .optional()
      .or(z.literal("")),
    documentPendukung: z
      .string()
      .url("URL dokumen tidak valid")
      .optional()
      .or(z.literal("")),
    imgProfile: z
      .string()
      .url("URL profil tidak valid")
      .optional()
      .or(z.literal("")),
    deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter").optional(),
    namaLengkap: z.string().optional(),
    kategori: z.enum(["mahasiswa", "alumni", "perusahaan"]),
    status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
    bidang: z.string().min(1, "Bidang wajib diisi").optional(),
    skill: z.array(z.number()).optional(),
    tahunLulus: z
      .number()
      .int()
      .positive()
      .gte(1900, "Tahun lulus minimal 1900")
      .lte(currentYear, `Tahun lulus tidak boleh lebih dari ${currentYear}`)
      .optional(),
    namaPerusahaan: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validasi tahun lulus untuk alumni
    if (
      data.kategori === "alumni" &&
      (!data.tahunLulus || data.tahunLulus === 0)
    ) {
      ctx.addIssue({
        path: ["tahunLulus"],
        code: z.ZodIssueCode.custom,
        message: "Tahun lulus wajib diisi untuk alumni",
      });
    }

    // Validasi nama perusahaan untuk kategori perusahaan
    if (
      data.kategori === "perusahaan" &&
      (!data.namaPerusahaan || data.namaPerusahaan.trim() === "")
    ) {
      ctx.addIssue({
        path: ["namaPerusahaan"],
        code: z.ZodIssueCode.custom,
        message: "Nama perusahaan wajib diisi untuk kategori perusahaan",
      });
    }

    // Validasi nama lengkap untuk mahasiswa dan alumni
    if (
      (data.kategori === "mahasiswa" || data.kategori === "alumni") &&
      (!data.namaLengkap || data.namaLengkap.trim() === "")
    ) {
      ctx.addIssue({
        path: ["namaLengkap"],
        code: z.ZodIssueCode.custom,
        message: "Nama lengkap wajib diisi untuk mahasiswa dan alumni",
      });

      ctx.addIssue({
        path: ["documentPendukung"],
        code: z.ZodIssueCode.custom,
        message:
          "Document Pendukung wajib diisi untuk mahasiswa dan alumni (BUKTI KTM/BUKTI PENDUKUNG)",
      });
    }

    // Validasi documentUrl: wajib diisi untuk mahasiswa dan alumni
    if (
      data.kategori !== "perusahaan" &&
      (!data.documentUrl || data.documentUrl.trim() === "")
    ) {
      ctx.addIssue({
        path: ["documentUrl"],
        code: z.ZodIssueCode.custom,
        message: "Document Portofolio wajib diisi untuk mahasiswa dan alumni",
      });
    }

    // Validasi imgProfile tetap wajib meskipun opsional di atas
    if (!data.imgProfile || data.imgProfile.trim() === "") {
      ctx.addIssue({
        path: ["imgProfile"],
        code: z.ZodIssueCode.custom,
        message: "URL profil wajib diisi",
      });
    }
  });

export type EditBiodataSchema = z.infer<typeof editBiodataSchema>;
