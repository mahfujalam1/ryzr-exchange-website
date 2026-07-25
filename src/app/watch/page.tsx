"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
export const dynamic = 'force-dynamic';
import {
  FiArrowLeft, FiShare2, FiPlay, FiPause,
  FiVolume2, FiVolumeX, FiChevronUp, FiChevronDown,
} from "react-icons/fi";

import { fetchVideos } from "@/actions";

const API_BASE_URL = "https://web-production-6b4fb.up.railway.app";
const getFullUrl = (url: string) => url.startsWith('/') ? `${API_BASE_URL}${url}` : url;

interface Video {
  id: string;
  video_url: string;
  video_url_mp4?: string;
  title: string;
  short_description: string;
  thumbnail_url: string;
  career_role: string;
  views: number;
  is_saved: boolean;
}

function WatchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const v = searchParams.get("v");

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    fetchVideos().then((data) => {
      setVideos(data);
      setIsLoading(false);
    });
  }, []);

  // Once videos are loaded, find the correct index from URL param
  useEffect(() => {
    if (videos.length > 0 && !isInitialized.current) {
      if (v) {
        const index = videos.findIndex((video) => video.id === v);
        if (index !== -1) {
          setCurrentIndex(index);
        }
      }
      // Mark as initialized so URL-sync effect can now run
      isInitialized.current = true;
    }
  }, [videos, v]);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPlayIcon, setShowPlayIcon] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const volumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setIsBuffering(true);
    setCurrentTime(0);
    setDuration(0);
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    const currentVideo = videos[currentIndex];

    if (!video || !currentVideo) return;

    video.autoplay = true;
    video.defaultMuted = false;
    video.muted = false;
    video.volume = volume;
    setIsMuted(false);
    video.play().catch(() => {
      setIsBuffering(false);
      setIsPlaying(false);
      setShowPlayIcon(true);
    });
  }, [currentIndex, videos]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration || 0);
    }
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsBuffering(false);
    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setShowPlayIcon(false);
      }).catch(() => {
        setIsPlaying(false);
        setShowPlayIcon(true);
      });
    }
  };

  const handleProgressSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video && duration > 0) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    volumeTimerRef.current = setTimeout(() => setShowVolumeSlider(false), 3000);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const nowMuted = !vid.muted;
    vid.muted = nowMuted;
    if (!nowMuted && vid.volume === 0) {
      vid.volume = 1;
      setVolume(1);
    }
    setIsMuted(nowMuted);
    setShowVolumeSlider(true);
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    volumeTimerRef.current = setTimeout(() => setShowVolumeSlider(false), 3000);
  };

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (videos.length > 0 && typeof window !== "undefined" && isInitialized.current) {
      const id = videos[currentIndex].id;
      const params = new URLSearchParams(window.location.search);
      const currentParam = params.get('v');
      if (currentParam !== id) {
        router.replace(`/watch?v=${id}`);
      }
    }
  }, [currentIndex, videos]);


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
          text: currentVideo.short_description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Video link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (videos.length === 0) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">No videos found.</div>;
  }

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
                key={videos[currentIndex].id}
                src={getFullUrl(
                  videos[currentIndex].video_url_mp4 ??
                    videos[currentIndex].video_url,
                )}
                className="w-full h-full object-cover cursor-pointer"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls={false}
                preload="metadata"
                poster={getFullUrl(videos[currentIndex].thumbnail_url)}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onCanPlay={handleCanPlay}
                onLoadedData={() => setIsBuffering(false)}
                onError={() => {
                  setIsBuffering(false);
                  setIsPlaying(false);
                  setShowPlayIcon(true);
                }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

              <AnimatePresence>
                {isBuffering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  >
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>

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
                        <FiPause className="text-white text-3xl" />
                      ) : (
                        <FiPlay className="text-white text-3xl" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 space-y-3 pr-20">
                <div className="px-4">
                  <h3 className="text-white text-lg mb-2 font-bold leading-tight drop-shadow-md">
                    {videos[currentIndex].title}
                  </h3>
                  <p className="text-white/80 text-sm mb-2 drop-shadow-md line-clamp-3 leading-relaxed">
                    {videos[currentIndex].short_description}
                  </p>
                  <div className="text-white/60 text-xs mb-3">
                    Added by{" "}
                    <span className="text-[#16a34a] font-bold">Ryzr Exchange</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="px-4 pb-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/70 text-[10px] font-mono tabular-nums">{formatTime(currentTime)}</span>
                    <div className="relative flex-1 h-1 group">
                      <div className="absolute inset-0 rounded-full bg-white/20" />
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-[#16a34a] transition-all"
                        style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%" }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={duration > 0 ? (currentTime / duration) * 100 : 0}
                        onChange={handleProgressSeek}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                        style={{ margin: 0, padding: 0 }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md transition-all pointer-events-none"
                        style={{ left: duration > 0 ? `calc(${(currentTime / duration) * 100}% - 6px)` : "-6px" }}
                      />
                    </div>
                    <span className="text-white/70 text-[10px] font-mono tabular-nums">{formatTime(duration)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 bottom-24 flex flex-col gap-5 z-20">
                {/* Mute button with vertical volume slider above on hover */}
                <div
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Vertical Volume Slider — appears above the button */}
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full mb-3 flex flex-col items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiVolume2 className="text-white/70 text-sm flex-shrink-0" />
                        <div className="relative flex items-center justify-center" style={{ height: 80, width: 20 }}>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.02}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            onClick={(e) => e.stopPropagation()}
                            className="cursor-pointer accent-[#16a34a]"
                            style={{
                              writingMode: "vertical-lr",
                              direction: "rtl",
                              width: 4,
                              height: 80,
                              // appearance: "slider-vertical",
                              WebkitAppearance: "slider-vertical",
                              background: `linear-gradient(to top, #16a34a ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`,
                              borderRadius: 4,
                              outline: "none",
                              border: "none",
                            }}
                          />
                        </div>
                        <FiVolumeX className="text-white/70 text-sm flex-shrink-0" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-1.5 drop-shadow-lg cursor-pointer"
                    onClick={handleMuteToggle}
                  >
                    <div className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/50 transition-all">
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
                </div>

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
