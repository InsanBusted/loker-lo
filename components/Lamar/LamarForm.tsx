"use client";

import { submitLamar } from "@/lib/actions/addLamar";
import supabase from "@/lib/supabase/client";
import { lamarSchema, LamarSchema } from "@/lib/validation/lamar";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  userId: string;
  lowonganId: string;
  initialData?: LamarSchema;
  formEdit?: LamarSchema;
};

const LamarForm = ({ userId, lowonganId, initialData, formEdit }: Props) => {
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const [state, formAction] = useActionState(submitLamar, {
    success: false,
    error: "",
  });

  const form = useForm<LamarSchema>({
    resolver: zodResolver(lamarSchema),
    defaultValues: {
      ...initialData,
      userId,
      lowonganId,
    },
  });

  useEffect(() => {
    if (state.success) {
      setAlertTitle("Berhasil");
      setAlertDescription("Lamaran berhasil dikirim.");
      setAlertOpen(true);
    } else if (state.error) {
      setAlertTitle("Gagal");
      setAlertDescription(state.error);
      setAlertOpen(true);
    }
    setIsSubmitting(false);
  }, [state]);

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("lokerlo")
        .upload(fileName, file);
      if (error) throw error;

      const { data: publicData } = await supabase.storage
        .from("lokerlo")
        .getPublicUrl(data.path);
      form.setValue("documentUrl", publicData.publicUrl);
    } catch (error) {
      alert("Gagal upload dokumen");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-[80vw] mx-auto">
      <Form {...form}>
        <form
          action={formAction}
          onSubmit={() => setIsSubmitting(true)}
          className="space-y-6"
        >
          {/* Hidden Inputs */}
          <input type="hidden" {...form.register("userId")} />
          <input type="hidden" {...form.register("lowonganId")} />
          <input type="hidden" {...form.register("documentUrl")} />
          <input type="hidden" {...form.register("status")} />

          {/* Cover Letter */}
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <div>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tulis cover letter lamaran Anda..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          {/* Upload Dokumen */}
          <div className="space-y-2">
            <FormLabel>Upload Dokumen</FormLabel>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={documentInputRef}
              onChange={handleDocumentUpload}
            />
            {uploading && (
              <p className="text-sm text-muted-foreground">Mengunggah...</p>
            )}
            {form.watch("documentUrl") && (
              <p className="text-sm text-green-600">
                Dokumen berhasil diunggah
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting || uploading}>
            {formEdit ? "Perbarui Lamaran" : "Kirim Lamaran"}
          </Button>
        </form>
      </Form>

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          <AlertDialogFooter>
            <Button onClick={() => setAlertOpen(false)}>Oke</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LamarForm;
