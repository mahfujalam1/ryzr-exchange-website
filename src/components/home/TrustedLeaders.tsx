"use client";

import Marquee from "react-fast-marquee";

const leaders = [
  {
    name: "Emirates",
    logo: "/industryLeaders/Air-India-Logo.png",
  },
  {
    name: "Delta",
    logo: "/industryLeaders/Airbus-Logo.png",
  },
  {
    name: "United Airlines",
    logo: "/industryLeaders/Boeing-Logo.png",
  },
  {
    name: "Lufthansa",
    logo: "/industryLeaders/Emirates-Logo.png",
  },
  {
    name: "Qatar Airways",
    logo: "/industryLeaders/image.png",
  },
  {
    name: "American Airlines",
    logo: "/industryLeaders/IndiGo-Logo.png",
  },
  {
    name: "British Airways",
    logo: "/industryLeaders/Qatar-Airways-Logo.png",
  }
];

export default function TrustedLeaders() {
  return (
    <section className="py-10 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned header */}
        <p className="text-lg font-bold text-gray-800 tracking-widest uppercase mb-8">
          Companies We Aspire to Work With
        </p>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden container mx-auto">
        {/* Fading side masks for transition */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 z-10 pointer-events-none" />

        <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee
            speed={45}
            gradient={false}
            pauseOnHover={true}
            className="flex"
          >
            {[...leaders, ...leaders, ...leaders].map((leader, index) => (
              <div
                key={`${leader.name}-${index}`}
                className="mx-8 sm:mx-12 flex items-center justify-center h-10 sm:h-16 md:h-32 select-none"
              >
                <img
                  src={leader.logo}
                  alt={leader.name}
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-12 md:h-16 w-auto object-contain opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-300 pointer-events-none"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
