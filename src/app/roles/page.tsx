"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiPlay, FiChevronRight } from "react-icons/fi";
import Header from "@/components/Header";
import { fetchVideos } from "@/actions";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://ryzr-exchange.up.railway.app";
const getFullUrl = (url: string) => url.startsWith('/') ? `${API_BASE_URL}${url}` : url;


export default function RolesPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />

      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h3
              onClick={() => router.back()}
              className="inline-flex items-center cursor-pointer gap-1.5 text-sm font-bold text-neutral-500 hover:text-primary transition-colors mb-6"
            >
              <FiChevronLeft className="text-lg" /> Back to Home
            </h3>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 uppercase tracking-tight">
              All <span className="text-primary">Aviation</span> Roles
            </h1>
            <p className="mt-4 text-neutral-600 max-w-2xl text-lg">
              Explore our comprehensive library of aviation roles. Watch detailed videos to discover the career path that's right for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
                {/* Aspect Ratio 30s Video Card */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={getFullUrl(video.thumbnail_url)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />

                  {/* Pulsing Play Button */}
                  <button
                    onClick={() => router.push(`/watch?v=${video.id}`)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#16a34a] hover:bg-emerald-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90 border border-white/20"
                  >
                    <FiPlay className="text-base ml-1 fill-current" />
                  </button>

                  {/* Time Tag */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                    {video.duration || "30s"}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#16a34a] transition-colors line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium leading-relaxed mt-2 flex-grow line-clamp-2">
                    {video.short_description}
                  </p>

                  {/* Watch Button */}
                  <button
                    onClick={() => router.push(`/watch?v=${video.id}`)}
                    className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-[#16a34a] hover:text-emerald-700 group-hover:translate-x-1 transition-all text-left w-fit cursor-pointer uppercase tracking-wider"
                  >
                    Watch Now <FiChevronRight className="text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
