"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FiCheck,
  FiCalendar,
  FiChevronRight,
  FiUserCheck,
  FiArrowLeft,
} from "react-icons/fi";

function JoinPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill fields if Google provider is passed, or pre-fill phone if passed from home page
  useEffect(() => {
    const phoneParam = searchParams.get("phone");
    const providerParam = searchParams.get("provider");

    if (providerParam === "google") {
      setFirstName("Mahfuj");
      setLastName("Alam");
      setPhone("+91 98765 43210");
      setEmail("mahfuj.alam@gmail.com");
      setBirthYear("2002");
      setAgree(true);
    } else if (phoneParam) {
      setPhone(decodeURIComponent(phoneParam));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;

    // Simulate API registration request
    setIsSubmitted(true);
  };

  // Generate birth years from current - 15 back to current - 60
  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 45 }, (_, i) => currentYear - 15 - i);

  if (isSubmitted) {
    return (
      <div className="flex-grow flex items-center justify-center py-16 px-4 bg-gradient-to-b from-emerald-50/10 to-transparent">
        <div className="w-full max-w-md bg-white border border-emerald-50 rounded-2xl p-8 shadow-xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center text-3xl mb-5 shadow-inner">
            <FiUserCheck className="animate-bounce" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
            Welcome to the Community!
          </h2>
          <p className="text-sm text-neutral-500 font-medium leading-relaxed mt-3">
            Hey <span className="text-primary font-bold">{firstName}</span>,
            your registration is complete! You are now part of a global
            community of 50K+ aviation dreamers.
          </p>
          <div className="w-full bg-emerald-50/50 rounded-xl p-4 border border-emerald-50/70 text-left my-6 flex flex-col gap-2">
            <p className="text-[11px] font-black text-neutral-400 uppercase tracking-wider">
              Your Next Steps:
            </p>
            <div className="flex gap-2 items-center text-xs font-semibold text-neutral-700">
              <FiCheck className="text-primary" /> Watch 30s role videos to
              discover your path
            </div>
            <div className="flex gap-2 items-center text-xs font-semibold text-neutral-700">
              <FiCheck className="text-primary" /> Complete your AI career quiz
              in our mobile app
            </div>
            <div className="flex gap-2 items-center text-xs font-semibold text-neutral-700">
              <FiCheck className="text-primary" /> Explore jobs and connect with
              industry experts
            </div>
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <button
              onClick={() => router.push("/watch")}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-sm font-black rounded-lg transition-all shadow-md active:scale-98 flex items-center justify-center gap-1 cursor-pointer"
            >
              Start Watching Roles <FiChevronRight />
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-sm font-bold rounded-lg border border-neutral-200 transition-all active:scale-98 flex items-center justify-center gap-1 cursor-pointer"
            >
              <FiArrowLeft /> Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-12 md:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/10 via-white to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Overlapping Aviation Crew Images */}
          <div className="lg:col-span-6 flex justify-center w-full max-w-lg mx-auto lg:max-w-none relative">
            <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-[5/4] shrink-0">
              {/* Primary Image: Flight Crew in airport terminal */}
              <div className="w-[85%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white absolute left-0 top-0 z-10 hover:z-20 transition-all">
                <img
                  src="/join1.png"
                  alt="Aviation crew members standing"
                  className="w-full h-full object-cover scale-102 hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Inset Image: Crew briefing round-table */}
              <div className="w-[45%] aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white absolute right-0 bottom-4 z-20 hover:scale-102 transition-transform duration-300">
                <img
                  src="/join2.png"
                  alt="Flight crew briefing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Form Container */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 md:p-10 shadow-2xl shadow-emerald-950/[0.03]">
              <h1 className="text-2xl sm:text-2xl font-bold text-primary uppercase tracking-tight text-center sm:text-left leading-none ">
                Join the Community
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-3 text-center sm:text-left leading-relaxed">
                Connect with aspiring aviation professionals and explore
                opportunities, guidance, and support for your journey.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4"
              >
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-neutral-700 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:bg-white transition-all font-medium text-neutral-800"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-neutral-700 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:bg-white transition-all font-medium text-neutral-800"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-neutral-700 uppercase tracking-wider">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:bg-white transition-all font-medium text-neutral-800"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-neutral-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:bg-white transition-all font-medium text-neutral-800"
                  />
                </div>

                {/* Birth Year Dropdown */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-xs font-black text-neutral-700 uppercase tracking-wider">
                    Birth Year
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:bg-white transition-all font-medium text-neutral-700 cursor-pointer appearance-none"
                    >
                      <option value="" disabled>
                        Select your birth year
                      </option>
                      {birthYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <FiCalendar className="absolute right-4 text-neutral-400 pointer-events-none text-base" />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                    className="w-4 h-4 text-primary bg-neutral-50 border-neutral-300 rounded focus:ring-primary focus:ring-2 mt-0.5 shrink-0 cursor-pointer"
                  />
                  <label
                    htmlFor="consent"
                    className="text-[11.5px] leading-relaxed text-neutral-500 font-semibold cursor-pointer select-none"
                  >
                    I agree to be contacted by email or phone regarding my
                    inquiry and platform updates.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!agree}
                  className={`w-full mt-4 py-3.5 bg-primary text-white text-sm font-black rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                    agree
                      ? "hover:bg-primary-hover active:scale-99"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Join Now - It's Free ⚡
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Reusable Header */}
      <Header />

      {/* Suspense Wrapper to read searchParams */}
      <Suspense
        fallback={
          <div className="flex-grow flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-primary animate-spin" />
            <span className="text-sm font-bold text-neutral-400 mt-4 tracking-wider uppercase">
              Loading Page...
            </span>
          </div>
        }
      >
        <JoinPageContent />
      </Suspense>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
