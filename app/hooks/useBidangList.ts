"use client";

import { useEffect, useState } from "react";

export function useBidangList() {
  const [bidangList, setBidangList] = useState<{ id: string; nama: string }[]>(
    []
  );

  useEffect(() => {
    const fetchBidang = async () => {
      const res = await fetch("/api/bidang");
      const data = await res.json();
      setBidangList(data);
    };

    fetchBidang();
  }, []);

  return bidangList;
}