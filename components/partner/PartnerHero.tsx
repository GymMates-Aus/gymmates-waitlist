import Image from "next/image";
import PartnerForm from "../PartnerForm";

export default function PartnerHero() {
  return (
    <section
      id="hero"
      className="relative bg-ink text-bone overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <header className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-5 sm:pt-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/handshake.png"
            alt=""
            width={28}
            height={28}
            priority
            className="invert brightness-0 opacity-95"
          />
          <span className="font-display font-extrabold text-[18px] tracking-tight">
            GymMates
          </span>
        </div>
        <span className="eyebrow text-bone/55 hidden sm:inline">
          Pre-register · for gym owners
        </span>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20 grid gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14 items-start">
        <div>
          <p className="eyebrow text-bone/55 mb-4 sm:mb-5">
            For Australian gym owners
          </p>

          <h1 className="display-hero text-[clamp(34px,8.5vw,68px)]">
            Lock in <span className="accent-italic normal-case">founding partner</span><br />
            pricing.
          </h1>

          <p className="mt-5 sm:mt-6 max-w-[48ch] text-[16px] sm:text-[18px] leading-[1.55] text-bone/75">
            We&rsquo;re signing the first thirty gyms before public launch. Pre-register
            and your rate stays put for 24 months, even after we raise everyone
            else&rsquo;s.
          </p>

          {/* Perks */}
          <ul className="mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {[
              {
                t: "24-month price lock",
                b: "Whatever you sign at, that's what you pay until 2028.",
              },
              {
                t: "White-glove onboarding",
                b: "We come to you. Set your members up in one session.",
              },
              {
                t: "New-member channel",
                b: "Members on the consumer waitlist whose gym isn't onboard get matched to you.",
              },
              {
                t: "A direct line",
                b: "Talk to the founders. No support tickets, no offshore call centre.",
              },
            ].map((p) => (
              <li key={p.t} className="flex gap-3 items-start">
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
                  className="mt-1 text-ochre shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <p className="font-display font-bold text-[15px] mb-0.5">{p.t}</p>
                  <p className="text-[13px] leading-[1.5] text-bone/65 m-0">{p.b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form on the right (stacks under hero on mobile) */}
        <div className="md:sticky md:top-6">
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
