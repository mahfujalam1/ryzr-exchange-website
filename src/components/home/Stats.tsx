import { FiUser, FiBookOpen, FiBriefcase, FiAward } from "react-icons/fi";

export default function Stats() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="py-8 md:py-10 border-2 border-gray-200 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-neutral-300">
          {/* Stat 1 */}
          <div className="flex items-center gap-4 px-2 sm:px-6 justify-center md:justify-start">
            <div className="text-primary text-5xl">
              <FiUser />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">
                50K+
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-0.5">
                Gen Z Members
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 px-2 sm:px-6 justify-center md:justify-start">
            <div className="text-primary text-5xl">
              <FiBookOpen />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">
                150+
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-0.5">
                Training Partners
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 px-2 sm:px-6 pt-6 md:pt-0 justify-center md:justify-start">
            <div className="text-primary text-5xl">
              <FiBriefcase />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">
                10K+
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-0.5">
                Job Opportunities
              </p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-4 px-2 sm:px-6 pt-6 md:pt-0 justify-center md:justify-start">
            <div className="text-primary text-5xl">
              <FiAward />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">
                100+
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-0.5">
                Industry Leaders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
