import { FiCheck, FiDownload } from "react-icons/fi";

export default function AppPromo() {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: App Details */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6 max-w-xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-[#16a34a] rounded-full text-xs font-bold tracking-wide uppercase">
              <FiDownload className="text-sm shrink-0" />
              <span>Download Now</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-neutral-900 tracking-tight leading-tight uppercase text-left">
              Take Your Aviation <br />
              <span
                className="text-[#16a34a] italic font-normal inline-block mt-1 [font-synthesis:none]"
                style={{ fontFamily: "var(--font-marker)" }}
              >
                Career Anywhere
              </span>
            </h2>

            <p className="text-neutral-500 font-medium text-sm sm:text-base leading-relaxed text-left">
              Explore aviation careers, complete your AI career quiz, watch
              training content, and discover opportunities directly from your
              mobile device.
            </p>

            {/* Checkmarks */}
            <div className="flex flex-col gap-3 w-full mt-2">
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="text-[11px] font-bold" />
                </div>
                <span className="text-xs sm:text-[14px] font-bold text-neutral-700">
                  Take personalized aviation career quizzes
                </span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="text-[11px] font-bold" />
                </div>
                <span className="text-xs sm:text-[14px] font-bold text-neutral-700">
                  Watch short-form aviation role videos
                </span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="text-[11px] font-bold" />
                </div>
                <span className="text-xs sm:text-[14px] font-bold text-neutral-700">
                  Track training and career progress
                </span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="text-[11px] font-bold" />
                </div>
                <span className="text-xs sm:text-[14px] font-bold text-neutral-700">
                  Receive real-time job updates
                </span>
              </div>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 bg-black hover:bg-neutral-950 text-white rounded-xl flex items-center justify-center gap-3.5 transition-all hover:scale-[1.02] active:scale-98 border border-neutral-800 shadow-sm cursor-pointer"
              >
                <img
                  src="/AppStore.svg"
                  alt="App Store Icon"
                  className="w-6 h-6 object-contain"
                />
                <div className="text-left">
                  <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider leading-none">
                    Download on the
                  </p>
                  <p className="text-[15px] font-bold tracking-tight leading-none mt-1">
                    App Store
                  </p>
                </div>
              </a>

              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-6 py-3 bg-black hover:bg-neutral-950 text-white rounded-xl flex items-center justify-center gap-3.5 transition-all hover:scale-[1.02] active:scale-98 border border-neutral-800 shadow-sm cursor-pointer"
              >
                <img
                  src="/Google.svg"
                  alt="Google Play Icon"
                  className="w-5.5 h-5.5 object-contain"
                />
                <div className="text-left">
                  <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider leading-none">
                    Get it on
                  </p>
                  <p className="text-[15px] font-bold tracking-tight leading-none mt-1">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Phone Mockups */}
          <div className="lg:col-span-6 flex justify-center items-center w-full max-w-lg mx-auto lg:max-w-none relative mt-12 lg:mt-0 px-4">
            {/* Phone Wrapper */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              <img
                src="/iPhone 16 Pro.png"
                alt="iPhone 16 Pro Mockups"
                className="w-full h-auto object-contain max-h-[660px] relative z-10"
              />

              {/* Top-Right Badge: 4.9★ App Rating */}
              <div className="absolute top-[2%] right-[2%] sm:right-[12%] lg:right-[6%] xl:right-[24%] p-3 sm:p-5 bg-white/95 rounded-2xl shadow-lg flex flex-col items-center justify-center shrink-0 z-20 backdrop-blur-xs min-w-[95px] sm:min-w-[125px] border border-primary">
                <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl font-bold text-[#16a34a]">
                  <span>4.9</span>
                  <span className="text-lg sm:text-xl">★</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-bold tracking-wider mt-1 sm:mt-1.5 uppercase">
                  App Rating
                </span>
              </div>

              {/* Bottom-Left Badge: 500K+ Downloads */}
              <div className="absolute bottom-[2%] left-[2%] sm:left-[18%] lg:left-[10%] xl:left-[24%] p-3 sm:p-5 bg-white/95 rounded-2xl shadow-lg flex flex-col items-center justify-center shrink-0 z-20 backdrop-blur-xs min-w-[95px] sm:min-w-[125px] border border-primary">
                <span className="text-xl sm:text-2xl font-bold text-[#16a34a]">500K+</span>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-bold tracking-wider mt-1 sm:mt-1.5 uppercase">
                  Downloads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
