import Image from "next/image";
import WaitlistForm from "./WaitlistForm";

// TODO(counter): replace 247 with the live count from /api/waitlist GET
//   (or whatever endpoint we end up exposing).
const HARDCODED_COUNT = 247;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-forest text-bone overflow-hidden"
      // Use small viewport height (svh) on mobile so headline + form fit even
      // when the browser chrome is showing. Min-height kept modest so the next
      // section is visible to encourage scroll on tall phones.
      style={{ minHeight: "100svh" }}
    >
      {/* Subtle warm radial wash, picked up from the brand kit hero treatment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 18%, rgba(183,119,58,0.18), transparent 55%)",
        }}
      />

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
            One mate.<br />
            Same gym.<br />
            <span className="accent-italic normal-case">you&apos;ll show up.</span>
          </h1>

          <p className="mt-5 sm:mt-6 max-w-[44ch] text-[16px] sm:text-[18px] leading-[1.55] text-bone/80">
            GymMates pairs you with one compatible mate at your gym, so showing up gets
            a little easier. Free for members. Built in regional Victoria.
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
              <strong className="text-bone font-semibold">{HARDCODED_COUNT}</strong>{" "}
              already on the list
            </span>
          </div>
        </div>

        {/* Visual tile. Hidden on small phones so the form stays above the
            fold. Reappears on >= sm to add weight on tablet/desktop. */}
        <div className="hidden sm:block relative aspect-[4/5] rounded-lg bg-ink/40 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(183,119,58,0.22), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center">
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
      </div>
    </section>
  );
}
