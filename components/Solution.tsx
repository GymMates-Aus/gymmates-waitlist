// Mixed audience copy: defaults to "exercise" so the door stays open to mums
// and gym-anxious members. See CLAUDE.md voice rules · audience language.
const steps = [
  {
    n: "01",
    title: "Tell us how you exercise.",
    body: "Five minutes. Your gym, your usual times, your style. No fitness exam.",
  },
  {
    n: "02",
    title: "Get matched with one mate.",
    body: "Matched on goals, schedule, and experience (mentor or peer, your call). Same gym. Same gender by default.",
  },
  {
    n: "03",
    title: "Show up together.",
    body: "Lock in a session in-app. They turn up. You turn up. Nobody flakes alone.",
  },
];

export default function Solution() {
  return (
    <section id="how" className="bg-bone-2 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-[640px] mb-10 sm:mb-14">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="display-h2 text-[clamp(30px,5.6vw,48px)] text-ink">
            Three steps. <span className="accent-italic">That’s the lot.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-fg-muted">
            No swiping. No randoms. One match at a time, at your gym, on the days that
            suit you.
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-5 md:grid-cols-3" role="list">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative bg-bone border border-linen-2 rounded-lg p-6 sm:p-7"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  aria-hidden="true"
                  className="inline-grid place-items-center w-9 h-9 rounded-full bg-ink text-bone font-display font-bold text-[14px] tracking-tight tabular-nums"
                >
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block flex-1 h-px bg-linen-2"
                  />
                )}
              </div>
              <h3 className="font-display font-bold text-[18px] sm:text-[20px] text-ink mb-2">
                {s.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] leading-[1.55] text-fg-muted m-0">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
