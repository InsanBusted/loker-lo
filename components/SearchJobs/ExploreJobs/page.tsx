"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

interface Bidang {
  id: number;
  slug: string;
  nama: string;
}

interface Lowongan {
  id: string;
  namaPerusahaan: string;
  deskripsi: string;
  bidang: Bidang;
}

const ExploreJobs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [lowongan, setLowongan] = useState<Lowongan[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (!search.trim()) {
      setLowongan([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/lowongan/search?q=${encodeURIComponent(search.trim())}`
        );
        if (!res.ok) {
          console.error("Fetch error", await res.text());
          setLowongan([]);
          setLoading(false);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();
        setLowongan(data.data);
      } catch (error) {
        console.error("Fetch error", error);
        setLowongan([]);
      } finally {
        setLoading(false);
      }
    }, 200); // delay 400ms

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search]);

  return (
    <section className="w-full px-10 xl:pt-40 pt-35 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl w-full">
          <h1 className="text-2xl font-semibold mb-6">
            Explore remote development & IT jobs
          </h1>

          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-6"
            placeholder="Search by bidang, company name, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading && <p>Loading...</p>}

          {!loading && lowongan.length === 0 && search.trim() !== "" && (
            <p>No jobs found for &quot;{search.trim()}&quot;</p>
          )}

          <ul>
            {lowongan.map((job) => (
              <li
                key={job.id}
                className="border-b py-3 hover:bg-gray-100 transition cursor-pointer"
              >
                <Link href={`/lowongan/${job.id}`}>
                    <h2 className="text-lg font-semibold">
                      {job.namaPerusahaan}
                    </h2>
                    <p className="text-sm text-gray-600">{job.bidang.nama}</p>
                    <p>{job.deskripsi}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExploreJobs;
