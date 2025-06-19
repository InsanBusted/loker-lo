"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProposalSchema,
  UpdateProposalInput,
} from "@/lib/validation/updateProposal";
import { useTransition } from "react";
import { updateProposalStatusAction } from "@/lib/actions/updateProposalStatus";

export function EditProposalForm({
  proposalId,
  defaultStatus,
}: {
  proposalId: string;
  defaultStatus: string;
}) {
  const form = useForm<UpdateProposalInput>({
    resolver: zodResolver(updateProposalSchema),
    defaultValues: {
      proposalId,
      status: defaultStatus as UpdateProposalInput["status"],
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: UpdateProposalInput) => {
    const formData = new FormData();
    formData.append("proposalId", values.proposalId);
    formData.append("status", values.status);

    startTransition(() => {
      updateProposalStatusAction(formData);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubah Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="terima">Diterima</SelectItem>
                  <SelectItem value="tolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <input
          type="hidden"
          value={proposalId}
          {...form.register("proposalId")}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </Form>
  );
}
