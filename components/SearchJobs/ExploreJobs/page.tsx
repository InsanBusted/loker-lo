"use client";

import React, { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import type { Lowongan, Bidang } from "@prisma/client";
import { searchLowongan } from "@/lib/actions/searchLowongan";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExploreJobs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [lowongan, setLowongan] = useState<(Lowongan & { bidang: Bidang })[]>(
    []
  );
  const [initialLowongan, setInitialLowongan] = useState<
    (Lowongan & { bidang: Bidang })[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialJobs = async () => {
      try {
        const res = await fetch("/api/initial");
        const results = await res.json();
        setInitialLowongan(results);
      } catch (error) {
        console.error("Error fetching initial jobs:", error);
      }
    };

    fetchInitialJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!search.trim()) {
        setLowongan([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      startTransition(async () => {
        try {
          const results = await searchLowongan(search.trim());
          setLowongan(results);
        } catch (error) {
          console.error("Error searching jobs:", error);
          setLowongan([]);
        } finally {
          setLoading(false);
        }
      });
    };

    fetchJobs();
  }, [search]);

  const jobsToDisplay = search.trim() === "" ? initialLowongan : lowongan;

  return (
    <section className="w-full px-10 xl:pt-40 pt-35 bg-white">
      <div className="flex flex-col items-center justify-between gap-10">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Explore remote development & IT jobs
        </h1>

        <input
          type="text"
          className="w-full max-w-md border border-gray-300 rounded px-4 py-2 mb-6"
          placeholder="Search by bidang, company name, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading...</p>}

        {!loading && lowongan.length === 0 && search.trim() !== "" && (
          <p>No jobs found for &quot;{search.trim()}&quot;</p>
        )}

        <div className="flex flex-wrap gap-5 justify-center">
          {jobsToDisplay.map((job) => (
            <Link key={job.id} href={`/lowongan/${job.slug}`}>
              <Card className="w-[20rem] hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>{job.namaLowongan}</CardTitle>
                  <CardDescription>{job.lokasi}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-light line-clamp-3">{job.deskripsi}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">{job.bidang.nama}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreJobs;
