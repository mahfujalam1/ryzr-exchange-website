"use client";

import Link from "next/link";
import { FaTiktok, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-neutral-100 py-8 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Left Group: Logo, Divider, and Copyright Information */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Link href="/" className="flex items-center group shrink-0">
                            <img
                                src="/ryzr-logo.svg"
                                alt="Ryzr Exchange Logo"
                                className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                            />
                        </Link>

                        {/* Vertical Divider */}
                        <div className="hidden md:block h-8 w-[1px] bg-neutral-200" />

                        {/* Copyright & Links */}
                        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                            <span className="text-[13px] text-neutral-600 font-medium">
                                © 2026 RYZR Exchange. All rights reserved.
                            </span>
                            <div className="flex items-center text-[13px] text-neutral-400 font-medium">
                                <Link
                                    href="/privacy"
                                    className="hover:text-[#16a34a] transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <span className="mx-2 text-neutral-300">|</span>
                                <Link
                                    href="/terms"
                                    className="hover:text-[#16a34a] transition-colors"
                                >
                                    Terms of Use
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Group: Social Links */}
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm font-semibold text-neutral-700">
                            Follow us
                        </span>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.tiktok.com/@ryzer.ex?_r=1&_t=ZS-97JYRw8ZDKX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-[#16a34a] hover:text-emerald-700 transition-all hover:scale-110 active:scale-95"
                                aria-label="TikTok"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/ryzr-exchange"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-[#16a34a] hover:text-emerald-700 transition-all hover:scale-110 active:scale-95"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}