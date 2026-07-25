"use client";
import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CursorGlow from "@/components/ui/CursorGlow";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Load 3D scene only on client
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  useLenis();
  const { progress } = useScrollProgress();

  return (
    <>
      {/* Loading */}
      <LoadingScreen />

      {/* Custom cursor */}
      <CursorGlow />

      {/* Fixed 3D Background */}
      <Scene scrollProgress={progress} />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
