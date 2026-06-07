"use client";

import { useState } from "react";

const items = [
  {
    q: "What does it cost?",
    a: "Per location, per month. $60 for studios up to 10 members, $99 up to 100, $149 for unlimited. Founding partners lock these rates for 24 months.",
  },
  {
    q: "Do my members pay anything?",
    a: "No, never. The app is free for members, always. Gyms cover the licence so members don’t have to.",
  },
  {
    q: "How long does onboarding take?",
    a: "One session. We come to you, install the app on members’ phones, and have them up and matched the same day.",
  },
  {
    q: "Will my older or non-tech members use it?",
    a: "Yes. The onboarding flow takes five minutes and reads like a chat. We’ve tested it on members in their fifties and sixties at our own gym.",
  },
  {
    q: "Is this a dating app?",
    a: "No. Same-gender matching by default, friendship and training only. Block and report on every profile. Admins can never see chat content.",
  },
  {
    q: "When does it launch?",
    a: "Later this year. Founding partner gyms get onboarded first, in the order we sign them.",
  },
  {
    q: "Can I cancel?",
    a: "Any time. Month-to-month, no lock-in contract. Founding partner price-lock continues if you ever come back.",
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

export default function PartnerFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-bone-2 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <p className="eyebrow mb-3">Quick answers</p>
          <h2 className="display-h2 text-[clamp(28px,5vw,40px)] text-ink">
            The bits gym owners ask first.
          </h2>
        </div>

        <ul className="rounded-lg border border-linen-2 bg-bone overflow-hidden">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `partner-faq-panel-${i}`;
            const buttonId = `partner-faq-btn-${i}`;
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
