"use client";

import React from "react";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  label: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept,
  onFileSelect,
}: FileUploadProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept={accept}
          onChange={(e) =>
            onFileSelect(e.target.files ? e.target.files[0] : null)
          }
        />
      </FormControl>
    </FormItem>
  );
}
