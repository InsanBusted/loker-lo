import { z } from "zod";

export const BidangSchema = z.object({
  nama: z.string().min(1, "Nama bidang wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
});

export type Bidang = z.infer<typeof BidangSchema>;