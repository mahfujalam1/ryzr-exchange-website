"use client";

import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ExploreRoles from "@/components/home/ExploreRoles";
import Launchpad from "@/components/home/Launchpad";
import TrustedLeaders from "@/components/home/TrustedLeaders";
import AppPromo from "@/components/home/AppPromo";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1 space-y-24 bg-white">
        <Hero />
        <Stats />
        <ExploreRoles />
        <Launchpad />
        <TrustedLeaders />
        <AppPromo />
      </main>

      <Footer />
    </>
  );
}
