"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    // Show the bar once the hero leaves the viewport. Until then, the inline
    // hero form IS the visible CTA, so don't double up.
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-40% 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  function scrollToHero() {
    const el = document.getElementById("hero-form-email");
    const target = el ?? document.getElementById("hero");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Focus the email field shortly after the scroll lands.
    setTimeout(() => {
      (document.getElementById("hero-form-email") as HTMLInputElement | null)?.focus();
    }, 450);
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
          <strong className="font-semibold">Find a mate at your gym.</strong>
          <span className="block text-bone/65 text-[12px]">Free for members.</span>
        </span>
        <button
          type="button"
          onClick={scrollToHero}
          className="ml-auto btn btn-primary px-4 py-2.5 text-[14px]"
        >
          Join waitlist
        </button>
      </div>
    </div>
  );
}
