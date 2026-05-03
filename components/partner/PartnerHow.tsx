const steps = [
  {
    n: "01",
    title: "We onboard your members.",
    body: "One short session at the gym, members install the app and tell us how they exercise. We do the heavy lifting.",
  },
  {
    n: "02",
    title: "We match them with each other.",
    body: "Same gym, same vibe, same rough schedule, same gender by default. Each member ends up with one mate.",
  },
  {
    n: "03",
    title: "You see who shows up.",
    body: "Club dashboard tracks matches, sessions, and who hasn’t been in. The retention signal you’ve been missing.",
  },
];

export default function PartnerHow() {
  return (
    <section id="how" className="bg-bone py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-[640px] mb-10 sm:mb-14">
          <p className="eyebrow mb-3">How it works for the gym</p>
          <h2 className="display-h2 text-[clamp(30px,5.6vw,48px)] text-ink">
            Three steps. <span className="accent-italic">No new tech for you.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-fg-muted">
            Members run the app. You watch retention rise. We do everything in
            between.
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-5 md:grid-cols-3" role="list">
          {steps.map((s) => (
            <li
              key={s.n}
              className="bg-bone-2 border border-linen-2 rounded-lg p-6 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="inline-grid place-items-center w-9 h-9 rounded-full bg-ink text-bone font-display font-bold text-[14px] tracking-tight tabular-nums mb-3"
              >
                {s.n}
              </span>
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
