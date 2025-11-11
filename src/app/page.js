"use client";

import { useState } from "react";
import HeroSection from "./components/Hero";
import { TerminalLoader } from "./components/TerminalLoader";

export default function Home() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="bg-black min-h-screen">
      {/* Alert Modal Overlay */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <TerminalLoader mode="alert" onClose={() => setShowAlert(false)} />
        </div>
      )}

      <HeroSection />
    </div>
  );
}
