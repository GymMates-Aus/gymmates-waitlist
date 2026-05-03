"use client";

import { useEffect, useState } from "react";

export default function PartnerStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  function scrollToHero() {
    const target = document.getElementById("hero");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-0 inset-x-0 z-50 md:hidden transition ease-brand duration-200 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="m-3 rounded-md bg-ink/95 backdrop-blur-sm shadow-deep border border-white/10 px-3 py-2.5 flex items-center gap-3">
        <span className="text-bone text-[13px] leading-tight">
          <strong className="font-semibold">Founding partner pricing.</strong>
          <span className="block text-bone/65 text-[12px]">
            Locked for 24 months.
          </span>
        </span>
        <button
          type="button"
          onClick={scrollToHero}
          className="ml-auto btn btn-primary px-4 py-2.5 text-[14px]"
        >
          Pre-register
        </button>
      </div>
    </div>
  );
}
