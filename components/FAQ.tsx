"use client";

import { useState } from "react";

const items = [
  {
    q: "Is it really free?",
    a: "Yes. Free for members, always. Gyms cover a small licence so you don’t have to.",
  },
  {
    q: "When does it launch?",
    a: "Later this year. Waitlist members get in first, plus a founding-member badge and a vote on what we ship next.",
  },
  {
    q: "Which gyms can use it?",
    a: "Anywhere. We’re starting with Echuca and Moama, then rolling out gym by gym across regional Australia. If your gym isn’t on yet, the waitlist tells us where to go next.",
  },
  {
    q: "Is this a dating app?",
    a: "No. Friendship and training only. Same-gender matching by default, with block and report on every profile.",
  },
  {
    q: "What do you do with my email?",
    a: "Updates on the build, early access, that’s it. No spam, no selling lists. Unsubscribe in one click.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 transition duration-fast ease-brand ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone-2 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="eyebrow mb-3">Quick answers</p>
          <h2 className="display-h2 text-[clamp(28px,5vw,40px)] text-ink">
            The bits people ask first.
          </h2>
        </div>

        <ul className="rounded-lg border border-linen-2 bg-bone overflow-hidden">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-btn-${i}`;
            return (
              <li
                key={item.q}
                className={i === items.length - 1 ? "" : "border-b border-linen-2"}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 font-display font-bold text-[16px] sm:text-[18px] text-ink hover:bg-bone-2 transition duration-fast ease-brand"
                  >
                    <span>{item.q}</span>
                    <ChevronIcon open={isOpen} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15px] leading-[1.6] text-fg-muted"
                >
                  {item.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
