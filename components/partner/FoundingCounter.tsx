// TODO(counter): pull this from a Beehiiv segment count once we tag founding
//   partner signups separately, OR from our own DB row count, so the number
//   reflects reality. Hardcoded for the launch period.
const TAKEN = 8;
const TOTAL = 30;

export default function FoundingCounter() {
  const pct = Math.min(100, Math.round((TAKEN / TOTAL) * 100));
  return (
    <section
      id="founding"
      className="bg-ink text-bone py-16 sm:py-20"
      aria-label="Founding partner spots"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-10 md:grid-cols-2 md:gap-14 items-center">
        <div>
          <p className="eyebrow text-bone/55 mb-3">For the first thirty gyms</p>
          <h2 className="display-h2 text-[clamp(28px,4.6vw,40px)]">
            Founding partner gyms get pricing locked for{" "}
            <span className="accent-italic">24 months.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-bone/70 max-w-[44ch]">
            We&rsquo;re new and we&rsquo;ll prove it with the first thirty gyms.
            Founding-partner rates don&rsquo;t move, even after we raise everyone
            else&rsquo;s.
          </p>
          <a
            href="#hero"
            className="btn btn-primary mt-6 px-5 py-3.5 text-[15px]"
          >
            Apply as a founding partner
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="bg-white/[0.05] border border-white/10 rounded-lg p-7 sm:p-9 text-center">
          <p className="font-display font-extrabold text-[80px] sm:text-[96px] leading-none tracking-tighter tabular-nums text-ochre">
            {TAKEN}
            <span className="text-[28px] sm:text-[32px] text-bone/45 font-medium">
              /{TOTAL}
            </span>
          </p>
          <p className="eyebrow text-bone/55 mt-3">Spots already taken</p>
          <div
            className="mt-5 h-1 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={TAKEN}
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-label="Founding partner spots taken"
          >
            <span
              className="block h-full bg-ochre"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
