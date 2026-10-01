"use client";

import { useEffect, useState } from "react";
import { GearEmblem } from "./GearEmblem";

export function SiteLoader() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");

  useEffect(() => {
    const started = performance.now();
    const MIN = 1800;
    let t1: number | undefined;
    let t2: number | undefined;
    const finish = () => {
      const wait = Math.max(0, MIN - (performance.now() - started));
      t1 = window.setTimeout(() => {
        setPhase("hide");
        t2 = window.setTimeout(() => setPhase("gone"), 700);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-label="Yükleniyor"
      className={`site-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${
        phase === "hide" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,160,102,0.12),transparent_55%)]" />

      <GearEmblem mode="loader" className="relative w-56 sm:w-72" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/alevsan-wordmark.png" alt="Alevsan" className="relative mt-6 w-56 sm:w-72" />
      <div className="relative mt-4 h-0.5 w-56 overflow-hidden rounded bg-line sm:w-72">
        <span className="loader-progress absolute inset-y-0 left-0 bg-gradient-to-r from-copper-dark via-copper-light to-copper" />
      </div>
      <p className="relative mt-4 text-xs tracking-[0.35em] text-muted uppercase">Çeliğe işlenen sanat</p>
    </div>
  );
}
