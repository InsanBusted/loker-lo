"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}
