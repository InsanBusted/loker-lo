"use client";

import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editBiodataSchema } from "@/lib/validation/biodata";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "@/lib/supabase/client";
import { submitBiodata } from "@/lib/actions/addBiodata";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Loader2, X } from "lucide-react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

type BiodataFormType = z.infer<typeof editBiodataSchema>;

type Props = {
  bidang: { id: string; nama: string; slug: string }[];
  skill: { id: number; nama: string; slug: string }[];
  formEdit?: BiodataFormType;
  slug?: string;
};

export default function BiodataForm({ skill, bidang, formEdit }: Props) {
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [bidangSearchQuery, setBidangSearchQuery] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const documentPendukungRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const [state, formAction] = useActionState(submitBiodata, {
    success: false,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      setAlertTitle("Berhasil");
      setAlertDescription(
        formEdit ? "Biodata berhasil diperbarui!" : "Biodata berhasil disimpan!"
      );
      setAlertOpen(true);
    } else if (state.error) {
      setAlertTitle("Gagal");
      setAlertDescription(state.error);
      setAlertOpen(true);
    }
    setIsSubmitting(false);
  }, [state.success, state.error, formEdit]);

  const filteredSkill = skill.filter((item) =>
    item.nama.toLowerCase().includes(skillSearchQuery.toLowerCase())
  );
  const filteredBidang = bidang.filter((item) =>
    item.nama.toLowerCase().includes(bidangSearchQuery.toLowerCase())
  );

  const form = useForm<BiodataFormType>({
    resolver: zodResolver(editBiodataSchema),
    defaultValues: {
      documentUrl: formEdit?.documentUrl || "",
      documentPendukung: formEdit?.documentPendukung || "",
      imgProfile: formEdit?.imgProfile || "",
      deskripsi: formEdit?.deskripsi || "",
      kategori: formEdit?.kategori || "mahasiswa",
      status: formEdit?.status || "PENDING",
      bidang: "",
      skill: [],
      tahunLulus: undefined,
      namaPerusahaan: "",
      namaLengkap: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("lokerlo")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = await supabase.storage
        .from("lokerlo")
        .getPublicUrl(data.path);

      form.setValue("imgProfile", publicData.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };
  const handleDocumentPendukungUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("lokerlo")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = await supabase.storage
        .from("lokerlo")
        .getPublicUrl(data.path);

      form.setValue("documentPendukung", publicData.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };
  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("lokerlo")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicData } = await supabase.storage
        .from("lokerlo")
        .getPublicUrl(data.path);

      form.setValue("documentUrl", publicData.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal upload portofolio");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    formData.set("skill", JSON.stringify(selectedSkills));
    setIsSubmitting(true);
    await formAction(formData);
  };

  const toggleSkill = (id: number) => {
    setSelectedSkills((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id];
      form.setValue("skill", updated);
      return updated;
    });
  };

  const kategori = form.watch("kategori");
  const status = form.watch("status");
  const placeholder =
    kategori === "perusahaan"
      ? "Masukkan deskripsi perusahaan Anda..."
      : "Masukkan deskripsi Anda...";
  const bidangPerusahaan =
    kategori === "perusahaan" ? "Bidang Perusahaan" : "Bidang Pekerjaan";

  useEffect(() => {
    if (kategori === "perusahaan") {
      form.setValue("namaLengkap", "");
      form.setValue("documentUrl", "");
      form.setValue("documentPendukung", "");
    }
  }, [kategori, form]);

  return (
    <>
      <Form {...form}>
        <form
          action={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            {/* Kolom kiri */}

            <input type="hidden" name="kategori" value={kategori} />
            <input type="hidden" name="status" value={status} />
            {formEdit && (
              <input type="hidden" name="kategori" value={formEdit.kategori} />
            )}
            {!formEdit && (
              <FormField
                control={form.control}
                name="kategori"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Pilih Kategori --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                        <SelectItem value="perusahaan">Perusahaan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {(kategori === "mahasiswa" || kategori === "alumni") && (
              <FormField
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <Input placeholder="Nama lengkap Anda" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {kategori === "alumni" && (
              <FormField
                control={form.control}
                name="tahunLulus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Lulus</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input
              type="hidden"
              name="bidang"
              value={form.getValues("bidang")}
            />

            <FormField
              control={form.control}
              name="bidang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{bidangPerusahaan}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={uploading || state.success}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bidang..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="px-2 py-2">
                        <Input
                          placeholder="Cari bidang..."
                          onChange={(e) => setBidangSearchQuery(e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      {filteredBidang.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register("imgProfile")} />

            <FormField
              control={form.control}
              name="imgProfile"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Foto Profil</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            {/* Kolom kanan */}
            {kategori !== "perusahaan" && (
              <FormItem>
                <FormLabel>Skill</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedSkills.map((id) => {
                    const skillItem = skill.find((s) => s.id === id);
                    return (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {skillItem?.nama}
                        <button
                          type="button"
                          onClick={() => toggleSkill(id)}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
                <Command>
                  <CommandInput
                    placeholder="Cari skill..."
                    onValueChange={setSkillSearchQuery}
                  />
                  <CommandList className="max-h-56 overflow-y-auto">
                    {filteredSkill.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.nama}
                        onSelect={() => toggleSkill(item.id)}
                      >
                        {item.nama}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </FormItem>
            )}

            {kategori === "perusahaan" && (
              <FormField
                control={form.control}
                name="namaPerusahaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama perusahaan Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <input type="hidden" {...form.register("documentUrl")} />

            {kategori !== "perusahaan" && (
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="documentUrl"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Upload Portofolio{" "}
                        <span className="text-red-500">( PDF )</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          ref={documentInputRef}
                          onChange={handleDocumentUpload}
                          disabled={uploading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <input type="hidden" {...form.register("documentPendukung")} />
                <FormField
                  control={form.control}
                  name="documentPendukung"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Upload Foto Pendukung KTM/transkip nilai
                        <span className="text-red-500">
                          ( Foto / Screenshot )
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={documentPendukungRef}
                          onChange={handleDocumentPendukungUpload}
                          disabled={uploading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={uploading || isSubmitting || state.success}
              className="w-full"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Menyimpan...
                </span>
              ) : (
                "Simpan Biodata"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog
        open={alertOpen}
        onOpenChange={(open) => {
          setAlertOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                router.refresh();
                form.reset();
                setAlertOpen(false);
              }}
            >
              Oke
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
