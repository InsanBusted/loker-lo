import { z } from "zod";

export const SkillSchema = z.object({
  nama: z.string().min(1, "Nama skill wajib diisi"),
  slug: z.string().min(1, "Slug skill wajib diisi"),
});

export type Skill = z.infer<typeof SkillSchema>;