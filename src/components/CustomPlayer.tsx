"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FiArrowLeft, 
  FiVolume2, 
  FiVolumeX, 
  FiShare2, 
  FiDownload, 
  FiPlay, 
  FiPause,
  FiChevronUp,
  FiChevronDown,
  FiCheck
} from "react-icons/fi";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  durationText: string;
}

export const AVIATION_VIDEOS: VideoItem[] = [
  {
    id: "pilot",
    title: "First Solo Flight Experience",
    description: "How to prepare for your first solo flight - Essential tips and tricks that helped me succeed.",
    videoUrl: "https://player.vimeo.com/external/430646193.sd.mp4?s=d0034a02d4f828a25c15ec6696ef1a52ba932906&profile_id=165&oauth2_token_id=57447761",
    durationText: "0:30"
  },
  {
    id: "cabin-crew",
    title: "Life as a Cabin Crew Member",
    description: "Discover what a day in the life of a flight attendant looks like, from pre-flight briefings to landing.",
    videoUrl: "https://player.vimeo.com/external/517602120.sd.mp4?s=9108a73a388e285a21008693c4e3664d4c55ec36&profile_id=165&oauth2_token_id=57447761",
    durationText: "0:30"
  },
  {
    id: "maintenance",
    title: "Aircraft Pre-flight Inspections",
    description: "Walk with me through a full pre-flight checklist. The ground engineering crew is the heartbeat of safety.",
    videoUrl: "https://player.vimeo.com/external/540026210.sd.mp4?s=12c66dcb212e52b2f6ef3e3d23190df0e58fa2f4&profile_id=165&oauth2_token_id=57447761",
    durationText: "0:30"
  },
  {
    id: "ground-staff",
    title: "Airport Ramp Control Operations",
    description: "Guiding the metal giants on the tarmac. Smooth ramp control and ground operations are essential.",
    videoUrl: "https://player.vimeo.com/external/394867990.sd.mp4?s=0119e76fa1c55d0458dfad18bdf887d19efcb8a2&profile_id=165&oauth2_token_id=57447761",
    durationText: "0:30"
  }
];

interface CustomPlayerProps {
  initialVideoId?: string;
}

export default function CustomPlayer({ initialVideoId = "pilot" }: CustomPlayerProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = AVIATION_VIDEOS[currentIndex];

  useEffect(() => {
    const idx = AVIATION_VIDEOS.findIndex(v => v.id === initialVideoId);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  }, [initialVideoId]);

  useEffect(() => {
    // Reset video state when source changes
    if (videoRef.current) {
      videoRef.current.load();
      setProgress(0);
      setIsPlaying(false);
      
      // Auto play video when changed if possible
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false); // browser blocked autoplay
        });
      }
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing video:", err));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (newMuted) {
      videoRef.current.volume = 0;
    } else {
      videoRef.current.volume = volume;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const duration = videoRef.current.duration || 1;
    const currentTime = videoRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
    setProgress(pos * 100);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/watch?v=${currentVideo.id}` : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    // Simulate high-quality media asset downloading
    setTimeout(() => {
      setDownloading(false);
      // Open in a new tab to download
      window.open(currentVideo.videoUrl, "_blank");
    }, 1500);
  };

  const navigateVideo = (direction: "up" | "down") => {
    if (direction === "up") {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : AVIATION_VIDEOS.length - 1));
    } else {
      setCurrentIndex(prev => (prev < AVIATION_VIDEOS.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto py-4 md:py-8 px-4">
      {/* Navigation Controls (Left side on desktop, top/bottom arrows) */}
      <div className="hidden md:flex flex-col gap-4 text-neutral-400">
        <button 
          onClick={() => navigateVideo("up")}
          className="w-12 h-12 rounded-full bg-white hover:bg-emerald-50 border border-neutral-100 hover:border-primary/20 text-neutral-600 hover:text-primary flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
          title="Previous Role"
        >
          <FiChevronUp className="text-2xl" />
        </button>
        <span className="text-center text-xs font-bold text-neutral-400">
          {currentIndex + 1} / {AVIATION_VIDEOS.length}
        </span>
        <button 
          onClick={() => navigateVideo("down")}
          className="w-12 h-12 rounded-full bg-white hover:bg-emerald-50 border border-neutral-100 hover:border-primary/20 text-neutral-600 hover:text-primary flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
          title="Next Role"
        >
          <FiChevronDown className="text-2xl" />
        </button>
      </div>

      {/* Main Video Container (Strictly 9:16 Aspect Ratio) */}
      <div 
        className="relative aspect-[9/16] w-full max-w-[420px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-neutral-800/20 group/player flex items-center justify-center"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={currentVideo.videoUrl}
          className="w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Back Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push("/");
          }}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/10"
        >
          <FiArrowLeft className="text-lg" />
        </button>

        {/* Play/Pause Center Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white text-2xl animate-pulse-subtle">
              <FiPlay className="ml-1" />
            </div>
          </div>
        )}

        {/* Right-hand Sidebar Action Overlay */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5 z-20">
          {/* Volume Control */}
          <div 
            className="relative flex flex-col items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            {showVolumeSlider && (
              <div 
                className="absolute bottom-12 bg-black/75 backdrop-blur-md px-2 py-4 rounded-lg border border-white/10 -rotate-90 origin-bottom transform translate-y-2 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={isMuted ? 0 : volume} 
                  onChange={handleVolumeChange}
                  className="w-20 accent-accent cursor-pointer"
                />
              </div>
            )}
            <button
              onClick={toggleMute}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white flex flex-col items-center justify-center transition-all active:scale-95 hover:scale-105"
            >
              {isMuted ? <FiVolumeX className="text-lg" /> : <FiVolume2 className="text-lg" />}
            </button>
            <span className="text-[10px] text-white/90 font-bold tracking-wide mt-1 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
              Volume
            </span>
          </div>

          {/* Share Control */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-all active:scale-95 hover:scale-105"
            >
              {copied ? <FiCheck className="text-lg text-accent" /> : <FiShare2 className="text-lg" />}
            </button>
            <span className="text-[10px] text-white/90 font-bold tracking-wide mt-1 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
              {copied ? "Copied!" : "Share"}
            </span>
          </div>

          {/* Download Control */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleDownload}
              className={`w-11 h-11 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-all active:scale-95 hover:scale-105 ${downloading ? "animate-pulse" : ""}`}
            >
              <FiDownload className="text-lg" />
            </button>
            <span className="text-[10px] text-white/90 font-bold tracking-wide mt-1 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
              {downloading ? "Ready..." : "Download"}
            </span>
          </div>
        </div>

        {/* Bottom Text Overlay & Progress Bar */}
        <div 
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-20 flex flex-col justify-end text-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Role Title */}
          <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-md">
            {currentVideo.title}
          </h3>
          
          {/* Role Description */}
          <p className="text-xs text-white/80 mt-1.5 font-medium line-clamp-3 leading-relaxed drop-shadow">
            {currentVideo.description}
          </p>

          {/* Added By Badge */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-neutral-300">Added by</span>
            <span className="text-[11px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/25 tracking-wide uppercase">
              Ryzr Exchange
            </span>
          </div>

          {/* Interactive Progress Bar */}
          <div className="mt-4 flex items-center gap-2">
            <div 
              className="flex-1 h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer relative overflow-hidden transition-all"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute left-0 top-0 bottom-0 bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-black tracking-wider text-white/95 bg-black/35 px-1.5 py-0.5 rounded">
              {currentVideo.durationText}
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Info/Controls Panel (Mobile Quick Selector & Desktop Info) */}
      <div className="w-full max-w-[420px] md:max-w-[280px] flex flex-col gap-4">
        <div className="bg-white rounded-xl p-5 border border-emerald-50 shadow-sm">
          <h4 className="text-sm font-black text-neutral-800 uppercase tracking-wider mb-3">
            Explore Aviation Paths
          </h4>
          <div className="flex flex-col gap-2">
            {AVIATION_VIDEOS.map((video, idx) => (
              <button
                key={video.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 active:scale-98 ${
                  idx === currentIndex 
                    ? "bg-primary-light border-primary/20 text-primary font-bold shadow-xs" 
                    : "bg-neutral-50 hover:bg-neutral-100 border-neutral-100 text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  idx === currentIndex 
                    ? "bg-primary text-white" 
                    : "bg-neutral-200 text-neutral-600"
                }`}>
                  {idx === currentIndex && isPlaying ? (
                    <span className="flex gap-0.5 items-end justify-center w-3 h-3">
                      <span className="w-0.5 bg-current animate-bounce h-2" style={{ animationDelay: "0.1s" }} />
                      <span className="w-0.5 bg-current animate-bounce h-3" style={{ animationDelay: "0.2s" }} />
                      <span className="w-0.5 bg-current animate-bounce h-1" style={{ animationDelay: "0.3s" }} />
                    </span>
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs truncate uppercase tracking-wider">{video.id.replace("-", " ")}</p>
                  <p className="text-[10px] text-neutral-400 font-medium truncate mt-0.5">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-50 text-center">
          <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
            Ready to Takeoff?
          </p>
          <p className="text-[10.5px] text-neutral-500 font-medium mt-1">
            Join the community to unlock personalized pathways, aviation courses, and real opportunities!
          </p>
          <button 
            onClick={() => router.push("/join")}
            className="w-full mt-3 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}
