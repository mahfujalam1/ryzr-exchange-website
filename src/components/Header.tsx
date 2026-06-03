"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative w-full bg-white border-b border-emerald-50/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/ryzr-logo.svg"
            alt="Ryzr Exchange Logo"
            className="h-5 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex items-center gap-1 text-sm sm:text-[15px] text-neutral-600 font-medium">
            <span>Already in the community?</span>
            <Link
              href="/#app-promo"
              className="ml-2 px-4 py-2 border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary rounded-md font-semibold text-[14px] transition-all flex items-center gap-1 bg-white hover:bg-emerald-50/20"
            >
              Log in <FiChevronRight className="text-lg" />
            </Link>
          </div>

          <Link
            href="/join"
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-[14px] sm:text-[15px] font-bold rounded-md transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer relative overflow-hidden group active:scale-95"
          >
            Join Now - It's Free ⚡
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href="/join"
            className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-md transition-all flex items-center gap-1"
          >
            Join Free ⚡
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 hover:text-primary transition-colors rounded-md bg-neutral-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-50 bg-white/95 backdrop-blur-md transition-all py-4 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-xs text-neutral-500 font-medium text-center">
              Already in the community?
            </p>
            <Link
              href="/#app-promo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary rounded-md font-semibold text-sm transition-all flex items-center justify-center gap-1"
            >
              Log in <FiChevronRight />
            </Link>
            <Link
              href="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-md transition-all text-sm flex items-center justify-center gap-1"
            >
              Join Now - It's Free ⚡
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
