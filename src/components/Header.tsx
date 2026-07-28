import Link from "next/link";

export default function Header() {
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
          

          <Link
            href="/join"
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-[14px] sm:text-[15px] font-bold rounded-md transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer relative overflow-hidden group active:scale-95"
          >
            Join Now - It&apos;s Free ⚡
          </Link>
        </div>

        {/* Mobile call to action */}
        <div className="md:hidden">
          <Link
            href="/join"
            className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-md transition-all flex items-center gap-1"
          >
            Join Free ⚡
          </Link>
        </div>
      </div>
    </header>
  );
}
