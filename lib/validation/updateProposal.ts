import { z } from "zod";

export const updateProposalSchema = z.object({
  proposalId: z.string(),
  status: z.enum(["pending", "review", "terima", "tolak"]),
});

export type UpdateProposalInput = z.infer<typeof updateProposalSchema>;
