"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiZap } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import {
  countries as countriesList,
  type Country,
} from "@/constants/countries";

export default function Hero() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const defaultCountry =
    countriesList.find((c) => c.code === "+91") || countriesList[0];
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [flagDropdownOpen, setFlagDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 1. Check if user typed or pasted starting with '+' or '00' (e.g. "+880..." or "00880...")
    let normalized = value.trim();
    if (normalized.startsWith("00")) {
      normalized = "+" + normalized.slice(2);
    }

    if (normalized.startsWith("+")) {
      const digits = normalized.replace(/\D/g, "");
      // Sort countries by dial code length descending to match longer dial codes first (e.g. +880 before +88)
      const sortedCountries = [...countriesList].sort(
        (a, b) => b.code.length - a.code.length,
      );

      for (const country of sortedCountries) {
        const codeDigits = country.code.replace("+", "");
        if (digits.startsWith(codeDigits)) {
          setSelectedCountry(country);
          setCountryCode(country.code);
          setPhoneNumber(digits.slice(codeDigits.length));
          return;
        }
      }
    }

    // 2. Check if they typed a plain number starting with a known dial code directly (e.g. "88017...")
    // Only auto-detect if the number is at least 6 digits to avoid false positives with short codes (like USA "1")
    const numericOnly = value.replace(/\D/g, "");
    if (numericOnly.length >= 6) {
      const sortedCountries = [...countriesList].sort(
        (a, b) => b.code.length - a.code.length,
      );
      for (const country of sortedCountries) {
        const codeDigits = country.code.replace("+", "");
        if (codeDigits.length >= 2 && numericOnly.startsWith(codeDigits)) {
          setSelectedCountry(country);
          setCountryCode(country.code);
          setPhoneNumber(numericOnly.slice(codeDigits.length));
          return;
        }
      }
    }

    // Default fallback: just set phone number
    setPhoneNumber(numericOnly);
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    // Route to join page with phone pre-filled
    router.push(
      `/join?phone=${encodeURIComponent(countryCode + " " + phoneNumber)}`,
    );
  };

  const filteredCountries = countriesList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery) ||
      c.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex items-center bg-white overflow-hidden py-24 sm:py-32 lg:py-0">
      {/* Background Image & responsive gradients */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/hero-pilot.jpg"
          alt="Ryzr Exchange Hero Background"
          className="w-full h-full object-cover object-center lg:object-[center_-65%]"
        />
        {/* White glassmorphic gradient overlay for maximum mobile contrast & premium desktop look */}
        <div className="absolute inset-0 bg-white/85 sm:hidden" />
        <div className="absolute inset-0 hidden sm:block lg:hidden bg-white/20" />
        <div
          className="absolute inset-0 hidden lg:block bg-gradient-to-l from-transparent via-transparent to-white"
          style={{
            background:
              "linear-gradient(to right, white 0%, white 5%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Copy and Quick Registration Form */}
          <div className="lg:col-span-6 flex flex-col items-start gap-5 max-w-xl mx-auto lg:mx-0">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 border border-emerald-500/25 text-[#047857] rounded-full text-[11px] font-extrabold tracking-wider uppercase">
              <span>The future takes off with you</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-neutral-900 leading-[1.08] text-left uppercase">
              <span className="block">YOUR AVIATION</span>
              <span className="block">CAREER STARTS</span>
              <span
                className="block italic text-[#82e600] font-normal [font-synthesis:none]"
                style={{ fontFamily: "var(--font-marker)" }}
              >
                HERE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-500 font-semibold leading-relaxed text-left max-w-md">
              Real training. Real opportunities. <br />A global community for
              Gen Z dreamers.
            </p>

            {/* Quick Phone Sign Up Card */}
            <div className="w-full max-w-[450px] bg-white rounded-2xl border border-emerald-600/40 p-6 sm:p-7 shadow-xl shadow-emerald-950/[0.03] relative">
              <h2 className="text-xs font-bold text-[#047857] tracking-wider uppercase mb-4 text-center sm:text-left">
                Join Ryzr Exchange - It's Free!
              </h2>

              <form
                onSubmit={handleHeroSubmit}
                className="flex flex-col gap-3.5"
              >
                <div className="flex gap-2">
                  {/* Custom Flag Dropdown */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setFlagDropdownOpen(!flagDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-3 border border-neutral-200 rounded-lg text-sm font-bold bg-neutral-50 text-neutral-700 cursor-pointer hover:bg-neutral-100/50 transition-colors focus:outline-none focus:border-emerald-500 h-[46px]"
                    >
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.label}
                        className="w-5 h-3.5 rounded-sm object-cover shrink-0 border border-neutral-200/50"
                      />
                      <span>{selectedCountry.code}</span>
                      <svg
                        className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${flagDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {flagDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => {
                            setFlagDropdownOpen(false);
                            setSearchQuery("");
                          }}
                        />
                        <div className="absolute left-0 mt-1.5 w-64 bg-white border border-neutral-200 rounded-lg shadow-xl z-30 py-1.5 flex flex-col">
                          {/* Search Country Input */}
                          <div className="px-2 pb-2 border-b border-neutral-100 mb-1">
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs border border-neutral-200 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white text-neutral-800 font-semibold"
                              autoFocus
                            />
                          </div>

                          {/* Country List Container */}
                          <div className="max-h-60 overflow-y-auto no-scrollbar">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <button
                                  key={`${c.label}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setCountryCode(c.code);
                                    setFlagDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className="w-full px-3 py-2 text-left text-xs font-bold text-neutral-700 hover:bg-emerald-50 hover:text-[#047857] flex items-center gap-2.5 transition-colors cursor-pointer"
                                >
                                  <img
                                    src={c.flag}
                                    alt={c.label}
                                    className="w-5 h-3.5 rounded-sm object-cover shrink-0 border border-neutral-200/50"
                                  />
                                  <span className="truncate flex-1">
                                    {c.name}
                                  </span>
                                  <span className="text-neutral-400 font-mono text-[10px]">
                                    ({c.code})
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-xs text-neutral-400 font-semibold text-center">
                                No country found
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                    className="flex-1 px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#047857] hover:bg-[#035a41] text-white text-sm font-bold rounded-lg transition-all shadow-md active:scale-99 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  Join the Community{" "}
                  <FiZap className="text-base text-white fill-current" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex py-4 items-center justify-center text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
                <div className="flex-grow border-t border-neutral-200/60"></div>
                <span className="flex-shrink mx-3">or continue with</span>
                <div className="flex-grow border-t border-neutral-200/60"></div>
              </div>

              {/* Social/Google Button */}
              <button
                type="button"
                onClick={() => router.push("/join?provider=google")}
                className="w-full py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center justify-center transition-all cursor-pointer hover:border-neutral-300 shadow-sm"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
              </button>

              {/* Avatar Cluster */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-3 justify-center sm:justify-start">
                <div className="flex -space-x-2.5">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                    alt="user"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100"
                    alt="user"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                    alt="user"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100"
                    alt="user"
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-neutral-500">
                  <span className="text-[#047857] font-bold">50K+</span> Gen Z
                  dreamers already joined!
                </span>
              </div>
            </div>

            {/* Mobile/Tablet inline version of the floating card */}
            <div className="block lg:hidden w-full max-w-[450px] mt-2">
              <div className="bg-white rounded-2xl border border-emerald-600/40 p-5 shadow-lg flex flex-col gap-4">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <img
                      src="/build-future-icon.png"
                      alt="Build Your Future"
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                      BUILD YOUR FUTURE
                    </h3>
                    <p className="text-md sm:text-xs font-semibold text-neutral-500 mt-1 leading-normal">
                      Get trained. Get hired. Make an impact....
                    </p>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    <img
                      className="w-5.5 h-5.5 rounded-full border border-white object-cover"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60"
                      alt="member"
                    />
                    <img
                      className="w-5.5 h-5.5 rounded-full border border-white object-cover"
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60"
                      alt="member"
                    />
                  </div>
                  <span className="text-xs ">50K+ Membe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Empty space on large screen to let the background pilot image show completely */}
          <div className="hidden lg:block lg:col-span-6 relative h-full min-h-[500px]">
            {/* Desktop Absolute Floating Card */}
            <div className="absolute bottom-[10%] xl:bottom-[15%] right-0 w-80 p-5 rounded-2xl bg-white border border-emerald-600/40 shadow-2xl z-10">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <img
                    src="/build-future-icon.png"
                    alt="Build Your Future"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                    BUILD YOUR FUTURE
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-neutral-500 mt-1 leading-normal">
                    Get trained. Get hired. Make an impact.
                  </p>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-3 mt-4 flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <img
                    className="w-5.5 h-5.5 rounded-full border border-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60"
                    alt="member"
                  />
                  <img
                    className="w-5.5 h-5.5 rounded-full border border-white object-cover"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60"
                    alt="member"
                  />
                  <img
                    className="w-5.5 h-5.5 rounded-full border border-white object-cover"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60"
                    alt="member"
                  />
                </div>
                <span className="text-xs font-bold text-primary">
                  50K+ Members
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
