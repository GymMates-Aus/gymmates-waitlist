import Image from "next/image";
import WaitlistForm from "./WaitlistForm";
import { getSubscriberCount } from "@/lib/providers/beehiiv";

// Acts as a floor, not just a fallback. A "1 already on the list" line on a
// pre-launch waitlist tanks conversion. Once the real count exceeds this, the
// real count takes over. Bump this number ahead of any social push.
const SOCIAL_PROOF_FLOOR = 247;

export default async function Hero() {
  const live = await getSubscriberCount();
  const count = Math.max(live ?? 0, SOCIAL_PROOF_FLOOR);
  return (
    <section
      id="hero"
      className="relative bg-forest text-bone overflow-hidden"
      // Use small viewport height (svh) on mobile so headline + form fit even
      // when the browser chrome is showing. Min-height kept modest so the next
      // section is visible to encourage scroll on tall phones.
      style={{ minHeight: "100svh" }}
    >
      {/* Top brand bar */}
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
          Waitlist · for members
        </span>
      </header>

      {/* Main hero grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-8 sm:pt-16 pb-10 sm:pb-20 grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14 items-center">
        <div>
          <p className="eyebrow text-bone/55 mb-4 sm:mb-5">
            Free for members · Always
          </p>

          <h1 className="display-hero text-[clamp(36px,9vw,72px)]">
            All you need<br />
            is a mate.<br />
            <span className="accent-italic normal-case">&amp; you&apos;ll show up.</span>
          </h1>

          <p className="mt-5 sm:mt-6 max-w-[44ch] text-[16px] sm:text-[18px] leading-[1.55] text-bone/80">
            GymMates pairs you with one compatible mate, because we know having a
            mate who shares your goals makes you want to exercise.
          </p>

          <div className="mt-6 sm:mt-7 max-w-[440px]">
            <WaitlistForm id="hero-form" variant="dark" cta="Join the waitlist" />
            <p className="mt-3 text-[12px] text-bone/55">
              Free forever for members. Unsubscribe any time.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3 text-[13px] text-bone/65">
            <div className="flex" aria-hidden="true">
              {[
                { i: "JM", bg: "bg-bone text-ink" },
                { i: "SK", bg: "bg-hay text-ink" },
                { i: "RT", bg: "bg-earth text-bone" },
                { i: "AL", bg: "bg-linen text-ink" },
                { i: "+", bg: "bg-eucalypt text-bone" },
              ].map((a, idx) => (
                <span
                  key={a.i}
                  className={`inline-grid place-items-center w-7 h-7 rounded-full ring-2 ring-forest text-[11px] font-semibold ${a.bg} ${idx === 0 ? "" : "-ml-2"}`}
                >
                  {a.i}
                </span>
              ))}
            </div>
            <span>
              <strong className="text-bone font-semibold">{count}</strong> already
              on the list
            </span>
          </div>
        </div>

        {/* Visual tile. Hidden on small phones so the form stays above the
            fold. Reappears on >= sm to add weight on tablet/desktop. Pure
            ink/forest, no warm wash, per brand direction lock-in. */}
        <div className="hidden sm:grid place-items-center relative aspect-[4/5] rounded-lg bg-ink/40 overflow-hidden border border-white/5">
          <Image
            src="/brand/handshake-large.png"
            alt="GymMates handshake mark"
            width={520}
            height={520}
            priority
            className="w-1/2 h-auto opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
