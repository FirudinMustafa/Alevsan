"use client";

import { useEffect, useRef, useState } from "react";
import { gearPath } from "@/lib/gear";

export type JourneyStep = { icon: React.ReactNode; year: string; title: string; text: string };

const BADGE_GEAR = gearPath({ rRoot: 33, rTip: 39.5, innerR: 27 });
const CARRIAGE_GEAR = gearPath({ teeth: 10, rRoot: 9, rTip: 12, innerR: 4 });
// Ray boyunca adımlar arası süre (s); CSS'teki --journey-step ile aynı
const STEP = 0.6;

/** Yıldaki rakamları kilometre sayacı gibi yuvarlar ("1980'ler" → 1·9·8·0 + "'ler"). */
function Odometer({ value, delay }: { value: string; delay: number }) {
  return (
    <span className="inline-flex overflow-hidden leading-none" aria-label={value}>
      {[...value].map((ch, j) =>
        /\d/.test(ch) ? (
          <span key={j} className="journey-digit-window" aria-hidden="true">
            <span
              className="journey-digit-strip"
              style={{ "--digit": Number(ch), transitionDelay: `${delay + j * 0.09}s` } as React.CSSProperties}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={j} className="journey-suffix" style={{ transitionDelay: `${delay + 0.5}s` }} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      // Oran eşiği yerine kenar payı: mobilde tek sütunda çizelge ekrandan uzun olunca da tetiklenir
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="journey relative" data-active={active}>
      {/* Torna kızağı gibi ray: cetvel çentikleri + ilerleyen bakır dolgu + dönen araba dişlisi */}
      <div className="absolute top-[37px] right-[10%] left-[10%] hidden h-1.5 lg:block" aria-hidden="true">
        <div className="journey-track absolute inset-0 rounded-full" />
        <div className="journey-fill absolute inset-0 rounded-full" />
        <div className="journey-carriage absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="-13 -13 26 26" className="journey-carriage-spin h-7 w-7">
            <path d={CARRIAGE_GEAR} fillRule="evenodd" fill="#f0c28f" />
          </svg>
        </div>
      </div>

      <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
        {steps.map(({ icon, year, title, text }, i) => {
          const d = i * STEP;
          return (
            <li key={year} className="flex flex-col items-center text-center" style={{ "--d": `${d}s` } as React.CSSProperties}>
              <span className="relative z-10 flex h-20 w-20 items-center justify-center">
                <span className="journey-gear-wrap absolute inset-0">
                  <svg viewBox="-40 -40 80 80" className={`journey-gear h-full w-full ${i % 2 ? "journey-gear-rev" : ""}`}>
                    <path d={BADGE_GEAR} fillRule="evenodd" fill="#16161a" stroke="#d9a066" strokeOpacity="0.85" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="journey-hub relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-copper/40 bg-ink">
                  {icon}
                </span>
              </span>
              <p className="mt-5 font-display text-2xl font-bold">
                {/\d/.test(year) ? <Odometer value={year} delay={d + 0.15} /> : <span className="journey-text inline-block">{year}</span>}
              </p>
              <p className="journey-text mt-1 text-sm font-semibold">{title}</p>
              <p className="journey-text journey-text-late mt-3 max-w-52 text-sm text-muted">{text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
