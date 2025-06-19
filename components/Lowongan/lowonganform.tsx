"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { lowonganFormSchema, LowonganSchema } from "@/lib/validation/lowongan";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useBidangList } from "@/app/hooks/useBidangList";

export default function LowonganForm({
  userId,
  initialData,
}: {
  userId: string;
  initialData?: LowonganSchema;
}) {
  const [search, setSearch] = useState("");

  const form = useForm<LowonganSchema>({
    resolver: zodResolver(lowonganFormSchema),
    defaultValues: initialData || {
      namaPerusahaan: "",
      namaLowongan: "",
      deskripsi: "",
      bidangId: "",
      lokasi: "",
      gaji: "",
      benefit: [],
      kualifikasi: [],
      tugasTanggungJawab: [],
      kualifikasiTambahan: [],
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LowonganSchema) => {
    setIsSubmitting(true);

    const res = await fetch(`/api/lowongan/${userId}`, {
      method: data.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Gagal menyimpan data.");
    } else {
      alert("Berhasil disimpan!");
      router.push("/lowongan-saya");
    }

    setIsSubmitting(false);
  };

  const bidangList = useBidangList();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form grid untuk input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="namaLowongan"
            render={({ field }) => (
              <div>
                <FormLabel>Nama Lowongan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Senior Software Engineer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="bidangId"
            render={({ field }) => {
              const filteredBidang = bidangList.filter((b) =>
                b.nama.toLowerCase().includes(search.toLowerCase())
              );

              return (
                <div>
                  <FormLabel>Bidang</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bidang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="p-2">
                        <Input
                          placeholder="Cari bidang..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="mb-2"
                        />
                      </div>
                      {filteredBidang.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.nama}
                        </SelectItem>
                      ))}
                      {filteredBidang.length === 0 && (
                        <div className="text-muted-foreground px-4 py-2 text-sm">
                          Tidak ditemukan
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              );
            }}
          />

          <FormField
            control={form.control}
            name="lokasi"
            render={({ field }) => (
              <div>
                <FormLabel>Lokasi</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Jakarta, Bandung..." {...field} />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="gaji"
            render={({ field }) => (
              <div>
                <FormLabel>Gaji</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: 5.000.000 - 8.000.000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />
        </div>

        {/* Deskripsi: satu kolom penuh */}
        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <div>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jelaskan tentang perusahaan dan posisi..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "benefit",
            "kualifikasi",
            "tugasTanggungJawab",
            "kualifikasiTambahan",
          ].map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof LowonganSchema}
              render={() => (
                <div className="space-y-2">
                  <FormLabel className="capitalize text-base font-medium">
                    {key.replace(/([A-Z])/g, " $1")}
                  </FormLabel>
                  <div className="space-y-2">
                    {(form.watch(key as keyof LowonganSchema) as string[]).map(
                      (item, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const updated = [
                                ...(form.getValues(
                                  key as keyof LowonganSchema
                                ) as string[]),
                              ];
                              updated[index] = e.target.value;
                              form.setValue(
                                key as keyof LowonganSchema,
                                updated
                              );
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updated = (
                                form.getValues(
                                  key as keyof LowonganSchema
                                ) as string[]
                              ).filter((_, i) => i !== index);
                              form.setValue(
                                key as keyof LowonganSchema,
                                updated
                              );
                            }}
                          >
                            Hapus
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const updated = [
                        ...(form.getValues(key as keyof LowonganSchema) || []),
                        "",
                      ];
                      form.setValue(key as keyof LowonganSchema, updated);
                    }}
                  >
                    Tambah {key.replace(/([A-Z])/g, " $1")}
                  </Button>
                </div>
              )}
            />
          ))}
        </div>

        {/* Submit button */}
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Update Lowongan" : "Buat Lowongan"}
        </Button>
      </form>
    </Form>
  );
}
