import Link from "next/link";
import { FiAward, FiUsers, FiSend, FiTrendingUp, FiZap } from "react-icons/fi";

const launchpadFeatures = [
  {
    id: 1,
    title: "Learn from experts",
    icon: FiAward,
  },
  {
    id: 2,
    title: "Connect with peers",
    icon: FiUsers,
  },
  {
    id: 3,
    title: "Get Opportunities that match you",
    icon: FiSend,
  },
  {
    id: 4,
    title: "Grow your future",
    icon: FiTrendingUp,
  },
];

export default function Launchpad() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Photo */}
          <div className="lg:col-span-5 flex justify-center w-full max-w-lg mx-auto lg:max-w-none">
            <img
              src="/lunchpad.png"
              alt="Gen Z Launchpad"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Side: Copy & Bullet Points */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <p className="text-xs font-bold text-neutral-400 tracking-widest uppercase">
              More than a community.
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[54px] text-primary">
              <span
                className="block italic text-[#16a34a] font-normal [font-synthesis:none]"
                style={{ fontFamily: "var(--font-third-rail)" }}
              >
                It s your launchpad
              </span>
            </h2>

            <p className="text-base text-neutral-500 font-medium">
              Learn. Connect. Grow. Get hired.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 w-full mt-2">
              {launchpadFeatures?.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.id} className="flex gap-4 items-center">
                    <div className="text-4xl text-primary font-thin">
                      <IconComponent />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold">
                        {feature.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/join"
              className="px-10 py-2.5 bg-primary hover:bg-primary-hover text-white text-[10px] sm:text-[15px] font-bold rounded-md transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer relative overflow-hidden group active:scale-95"
            >
              Join the Community - It's Free{" "}
              <FiZap className="text-base text-white fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
