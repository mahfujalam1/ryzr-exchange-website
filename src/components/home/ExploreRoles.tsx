"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { fetchVideos } from "@/actions";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://ryzr-exchange.up.railway.app";

const getFullUrl = (url: string) => url.startsWith('/') ? `${API_BASE_URL}${url}` : url;

export default function ExploreRoles() {
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchVideos().then(setVideos);
  }, []);

  return (
    <section className="py-8 relative overflow-hidden container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 uppercase tracking-tight">
              Explore <span className="text-primary">Aviation</span> Roles
            </h2>
            <p className="text-neutral-500 font-medium text-sm sm:text-base mt-2">
              Not sure where to start? Watch 30-second videos and discover your
              path.
            </p>
          </div>
          <Link
            href="/roles"
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary rounded-md font-bold text-sm bg-white transition-all hover:bg-emerald-50/10 cursor-pointer self-start md:self-auto shadow-xs active:scale-98"
          >
            View All Roles <FiChevronRight />
          </Link>
        </div>

        {/* Swiper Slider */}
        <div className="relative w-full group px-2">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 4,
              },
            }}
            className="w-full !overflow-visible"
          >
            {videos.slice(0, 4).map((video) => (
              <SwiperSlide key={video.id} className="h-auto">
                <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group/card h-full">
                  {/* Aspect Ratio 30s Video Card */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={getFullUrl(video.thumbnail_url)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover/card:scale-104 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/25 transition-colors duration-300" />

                    {/* Pulsing Play Button */}
                    <button
                      onClick={() => router.push(`/watch?v=${video.id}`)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-accent hover:bg-accent-dark text-neutral-900 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95 group-hover/card:opacity-100 opacity-90 border border-white/20"
                    >
                      <FiPlay className="text-base ml-0.5 fill-current" />
                    </button>

                    {/* Time Tag */}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                      {video.duration}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-[17px] font-bold text-neutral-900 group-hover/card:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed mt-2 flex-grow">
                      {video.short_description}
                    </p>

                    {/* Watch Button */}
                    <button
                      onClick={() => router.push(`/watch?v=${video.id}`)}
                      className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:text-primary-hover group-hover/card:translate-x-1 transition-all text-left w-fit cursor-pointer uppercase tracking-wider"
                    >
                      Watch 30s <FiChevronRight className="text-base" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-1 md:-left-4 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-lg text-neutral-800 hover:text-primary flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            className="swiper-button-next-custom absolute right-1 md:-right-4 top-[40%] -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-lg text-neutral-800 hover:text-primary flex items-center justify-center transition-all z-20 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
