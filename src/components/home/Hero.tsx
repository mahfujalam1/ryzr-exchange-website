"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiZap } from "react-icons/fi";
import {
  countries as countriesList,
  type Country,
} from "@/constants/countries";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";
import { verifyPhoneNumber } from "@/actions";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Hero() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneError, setPhoneError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const defaultCountry =
    countriesList.find((c) => c.label === "CA") || countriesList[0];
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [flagDropdownOpen, setFlagDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (phoneNumber) {
      const isValid = isValidPhoneNumber(phoneNumber, selectedCountry.label as CountryCode);
      if (!isValid) {
        setPhoneError(`Please enter a valid phone number for ${selectedCountry.name}`);
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  }, [phoneNumber, selectedCountry]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneError || isVerifying) return;

    setIsVerifying(true);
    try {
      const fullPhone = countryCode + " " + phoneNumber;
      const response = await verifyPhoneNumber(fullPhone);

      if (response.valid) {
        // Route to join page with phone pre-filled
        router.push(
          `/join?phone=${encodeURIComponent(fullPhone)}`,
        );
      } else {
        setPhoneError("Phone number verification failed.");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || "Something went wrong. Please try again.";
      setPhoneError(errorMsg);
    } finally {
      setIsVerifying(false);
    }
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
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-neutral-900 leading-[1.08] text-left uppercase">
              <span className="block">YOUR AVIATION</span>
              <span className="block">CAREER STARTS</span>
              <span
                className="block italic text-[#82e600] font-normal [font-synthesis:none]"
                style={{ fontFamily: "var(--font-third-rail)" }}
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
            <div className="w-full max-w-[450px] mx-auto md:mx-0 bg-white rounded-2xl border border-emerald-600/40 p-4 sm:p-6 lg:p-7 shadow-xl shadow-emerald-950/[0.03] relative">
              <h2 className="text-[11px] sm:text-xs font-bold text-[#047857] tracking-wider uppercase mb-4 text-center sm:text-left leading-relaxed">
                Join Ryzr Exchange - It's Free!
              </h2>

              <form
                onSubmit={handleHeroSubmit}
                className="flex flex-col gap-3"
              >
                {/* Mobile Stack */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Country Dropdown */}
                  <div className="relative w-full sm:w-auto sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => setFlagDropdownOpen(!flagDropdownOpen)}
                      className="w-full sm:w-auto flex items-center justify-between gap-1.5 px-3 py-3 border border-neutral-200 rounded-lg text-sm font-bold bg-neutral-50 text-neutral-700 hover:bg-neutral-100/50 transition-colors focus:outline-none focus:border-emerald-500 min-h-[46px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.label}
                          className="w-5 h-3.5 rounded-sm object-cover shrink-0 border border-neutral-200/50"
                        />
                        <span>{selectedCountry.code}</span>
                      </div>

                      <svg
                        className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${flagDropdownOpen ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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

                        <div className="absolute left-0 mt-1.5 w-full sm:w-64 bg-white border border-neutral-200 rounded-lg shadow-xl z-30 py-1.5 flex flex-col">
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
                                  className="w-full px-3 py-2 text-left text-xs font-bold text-neutral-700 hover:bg-emerald-50 hover:text-[#047857] flex items-center gap-2.5 transition-colors"
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

                  {/* Phone Input */}
                  <div className="flex-1 w-full min-w-0">
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg text-sm bg-white font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none transition-colors ${phoneError ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-emerald-500"}`}
                    />
                  </div>
                </div>
                {phoneError && <span className="text-xs text-red-500 font-medium px-1">{phoneError}</span>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isVerifying}
                  className={`w-full cursor-pointer py-3 sm:py-3.5 bg-[#047857] hover:bg-[#035a41] text-white text-sm font-bold rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5 uppercase tracking-wider ${isVerifying ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isVerifying ? "Verifying..." : "Join the Community"}
                  {!isVerifying && <FiZap className="text-base text-white fill-current" />}
                </button>
              </form>

              {/* Divider */}
              <div className="relative flex py-4 items-center justify-center text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
                <div className="flex-grow border-t border-neutral-200/60"></div>
                <span className="flex-shrink mx-3 text-center">
                  or continue with
                </span>
                <div className="flex-grow border-t border-neutral-200/60"></div>
              </div>

              {/* Google Button */}
              <GoogleSignInButton />

              {/* Users */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start text-center sm:text-left">
                <div className="flex -space-x-2.5">
                  <img src="/group-avatar.png" alt="group avatar" className="w-full h-7" />
                </div>

                <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 leading-relaxed">
                  <span className="text-[#047857] font-bold">Our Goal:</span> Build a community of 10,000 aviation professionals
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
                  <span className="text-xs font-bold text-emerald-800">Goal: 10K+ Members</span>
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
                  Goal: 10K+ Members
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
