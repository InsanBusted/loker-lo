import { z } from "zod";

export const lamarSchema = z.object({
  userId: z.string().optional(),
  lowonganId: z.string().uuid({
    message: "Lowongan ID tidak valid",
  }),
  status: z.enum(["pending", "review", "tolak", "terima"]).optional(),
  coverLetter: z
    .string()
    .min(20, { message: "Cover letter minimal 20 karakter" })
    .max(5000, { message: "Cover letter maksimal 5000 karakter" }),
  documentUrl: z.string().url({ message: "URL dokumen tidak valid" }),
});

export type LamarSchema = z.infer<typeof lamarSchema>;
