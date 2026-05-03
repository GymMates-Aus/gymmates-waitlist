const tiers = [
  {
    name: "Friends plan",
    headline: "For smaller studios",
    price: "$60",
    cadence: "/mo",
    sub: "Per location, per month · Up to 100 members",
    feats: [
      "The GymMates app, free for your members",
      "Full onboarding session, we come to you",
      "Club dashboard tracking sign-ups and matches",
      "Member referral codes that bring new clients in",
    ],
    cta: "Apply for Friends Plan",
    rec: false,
  },
  {
    name: "Mates rates",
    headline: "For full gyms",
    price: "$99",
    cadence: "/mo",
    sub: "Per location, per month · Unlimited members",
    feats: [
      "Everything in Friends Plan",
      "Post-match prompt to leave a 5-star Google review",
      "Strategic implementation call with the founders",
      "New-member channel: people without a gym join yours",
    ],
    cta: "Apply for Mates Rates",
    rec: true,
  },
];

export default function PartnerPricing() {
  return (
    <section id="pricing" className="bg-bone-2 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-[640px] mb-10 sm:mb-12">
          <p className="eyebrow mb-3">Become a partner</p>
          <h2 className="display-h2 text-[clamp(30px,5.6vw,44px)] text-ink">
            Per location, per month.{" "}
            <span className="accent-italic">Cancel any time.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[16px] sm:text-[17px] leading-[1.55] text-fg-muted">
            Pricing is per-gym, not per-member. Your members never pay.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {tiers.map((t) => {
            const dark = t.rec;
            return (
              <article
                key={t.name}
                className={`relative rounded-lg p-7 sm:p-8 border ${
                  dark
                    ? "bg-ink text-bone border-ink"
                    : "bg-bone border-linen-2 text-ink"
                }`}
              >
                {t.rec && (
                  <span className="absolute top-4 right-4 bg-ochre text-bone text-[10px] font-semibold tracking-eyebrow uppercase px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
                <p
                  className={`font-body text-[11px] font-semibold tracking-eyebrowwide uppercase mb-3 ${
                    dark ? "text-bone/55" : "text-earth"
                  }`}
                >
                  {t.name}
                </p>
                <h3 className="font-display font-extrabold text-[24px] tracking-tight">
                  {t.headline}
                </h3>
                <p className="mt-4 mb-1 font-display font-extrabold text-[52px] sm:text-[56px] leading-none tracking-tighter tabular-nums">
                  {t.price}
                  <span
                    className={`text-[18px] font-medium ${
                      dark ? "text-bone/50" : "text-earth"
                    }`}
                  >
                    {t.cadence}
                  </span>
                </p>
                <p
                  className={`text-[13px] mb-6 ${
                    dark ? "text-bone/65" : "text-fg-muted"
                  }`}
                >
                  {t.sub}
                </p>

                <ul className="flex flex-col gap-2.5 mb-7 list-none p-0">
                  {t.feats.map((f) => (
                    <li
                      key={f}
                      className="text-[14px] leading-[1.45] pl-7 relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[5px] inline-block w-3.5 h-2 border-l-[1.5px] border-b-[1.5px] border-ochre -rotate-45"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#hero"
                  className={`btn w-full px-4 py-3.5 text-[15px] ${
                    dark ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {t.cta}
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-[13px] text-earth max-w-[640px]">
          Founding partners lock these rates for 24 months. After the first thirty
          gyms, prices step up.
        </p>
      </div>
    </section>
  );
}
