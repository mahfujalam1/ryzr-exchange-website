"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
export const dynamic = 'force-dynamic';
import {
  FiArrowLeft, FiShare2, FiDownload, FiPlay, FiPause,
  FiVolume2, FiVolumeX, FiChevronUp, FiChevronDown,
} from "react-icons/fi";

interface Video {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
}

export const videos: Video[] = [
  {
    id: 1,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569965/Airport_Customer_Service_nguaop.mp4",
    title: "Airport Customer Service",
    description: "Delivering excellence at every touchpoint — from check-in to boarding, discover what world-class airport service looks like.",
  },
  {
    id: 2,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569963/Pilot_qyovzl.mp4",
    title: "Pilot Career Path",
    description: "From student pilot to captain — an inside look at the journey, training requirements, and career milestones of becoming a professional pilot.",
  },
  {
    id: 3,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569960/Aircraft_Maintenance_karf5z.mp4",
    title: "Aircraft Maintenance",
    description: "Behind every safe flight is a dedicated maintenance crew. Learn how engineers keep aircraft airworthy and passengers safe.",
  },
  {
    id: 4,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569960/Cabin_Crew_fjomxr.mp4",
    title: "Cabin Crew Training",
    description: "Safety, service, and grace under pressure — explore the rigorous training that shapes exceptional cabin crew members.",
  },
  {
    id: 5,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569960/Air_Traffic_Control_gh48nf.mp4",
    title: "Air Traffic Control",
    description: "The invisible guardians of the sky — discover how air traffic controllers manage thousands of flights every day with precision.",
  },
  {
    id: 6,
    videoUrl: "https://res.cloudinary.com/dhsuyds5x/video/upload/v1778569959/Ground_Operations_okkc1q.mp4",
    title: "Ground Operations",
    description: "The unsung heroes of aviation — an in-depth look at the ground operations teams that keep airports running smoothly.",
  },
];

// ✅ Inner component — useSearchParams() এখানে থাকবে
function WatchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const v = searchParams.get("v");
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (v) {
      const id = parseInt(v, 10);
      const index = videos.findIndex((video) => video.id === id);
      if (index !== -1) return index;
    }
    return 0;
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPlayIcon, setShowPlayIcon] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0 && currentIndex < videos.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    setIsPlaying(true);
    setShowPlayIcon(false);
  }, [currentIndex]);

  useEffect(() => {
    const id = videos[currentIndex].id;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const currentParam = params.get('v');
      if (currentParam !== id.toString()) {
        router.replace(`/watch?v=${id}`);
      }
    }
  }, [currentIndex]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 800);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < videos.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleShare = async () => {
    const currentVideo = videos[currentIndex];
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentVideo.title,
          text: currentVideo.description,
          url: currentVideo.videoUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(currentVideo.videoUrl);
      alert("Video link copied to clipboard!");
    }
  };

  const handleDownload = async () => {
    try {
      const currentVideo = videos[currentIndex];
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = currentVideo.videoUrl;
      a.download = `${currentVideo.title.replace(/\s+/g, "_")}.mp4`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download video.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 sm:flex sm:items-center sm:justify-center">
      <div
        ref={containerRef}
        className="relative w-full h-[100dvh] sm:h-[90vh] sm:max-w-md sm:rounded-3xl sm:border-[8px] sm:border-neutral-800 bg-black overflow-hidden sm:shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="fixed sm:absolute top-6 left-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-all cursor-pointer"
        >
          <FiArrowLeft className="text-white text-2xl" />
        </motion.button>

        {/* Videos Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full" onClick={togglePlayPause}>
              <video
                ref={videoRef}
                key={videos[currentIndex].videoUrl}
                src={videos[currentIndex].videoUrl}
                className="w-full h-full object-cover cursor-pointer"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

              <AnimatePresence>
                {showPlayIcon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  >
                    <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                      {isPlaying ? (
                        <FiPlay className="text-white text-3xl" />
                      ) : (
                        <FiPause className="text-white text-3xl" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 pr-24">
                <div>
                  <h3 className="text-white text-lg mb-2 font-bold leading-tight drop-shadow-md">
                    {videos[currentIndex].title}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 drop-shadow-md line-clamp-3 leading-relaxed">
                    {videos[currentIndex].description}
                  </p>
                  <div className="text-white/60 text-xs">
                    Added by{" "}
                    <span className="text-[#16a34a] font-bold">Ryzr Exchange</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-5 z-20">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1.5 drop-shadow-lg cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const vid = videoRef.current;
                    if (vid) {
                      vid.muted = !vid.muted;
                      setIsMuted(vid.muted);
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/50 transition-all group">
                    {isMuted ? (
                      <FiVolumeX className="text-white text-xl" />
                    ) : (
                      <FiVolume2 className="text-white text-xl" />
                    )}
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow-md">
                    {isMuted ? "Unmute" : "Mute"}
                  </span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1.5 drop-shadow-lg cursor-pointer"
                  onClick={handleShare}
                >
                  <div className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-[#16a34a] hover:border-[#16a34a] transition-all group">
                    <FiShare2 className="text-white group-hover:text-white text-xl" />
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow-md">Share</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-1.5 drop-shadow-lg cursor-pointer"
                  onClick={handleDownload}
                >
                  <div className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-[#16a34a] hover:border-[#16a34a] transition-all group">
                    <FiDownload className="text-white group-hover:text-white text-xl" />
                  </div>
                  <span className="text-white text-[10px] font-bold drop-shadow-md">Save</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Up & Down Navigation Buttons */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
            }}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 active:scale-90 ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              }`}
            aria-label="Previous Video"
          >
            <FiChevronUp className="text-2xl" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < videos.length - 1) setCurrentIndex((prev) => prev + 1);
            }}
            disabled={currentIndex === videos.length - 1}
            className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 active:scale-90 ${currentIndex === videos.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
              }`}
            aria-label="Next Video"
          >
            <FiChevronDown className="text-2xl" />
          </button>
        </div>

        {/* Scroll Hint */}
        {currentIndex === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-xs flex flex-col items-center gap-1 z-10 pointer-events-none"
          >
            <span className="drop-shadow-md">Swipe up or use arrows</span>
            <svg className="w-5 h-5 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ✅ Page component — শুধু Suspense wrapper
export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>}>
      <WatchContent />
    </Suspense>
  );
}