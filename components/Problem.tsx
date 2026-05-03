const stories = [
  {
    quote: "My gym friend moved away. I haven’t been back since.",
    title: "The mum without her mum mate.",
    body: "School pickup, training, repeat. When the friend who made it work moves away, the routine goes with her.",
  },
  {
    quote: "I haven’t been in six weeks. Still paying.",
    title: "The bloke who keeps paying for nothing.",
    body: "Membership locked in. Motivation gone. No-one’s expecting him on Tuesday, so Tuesday turns into next week.",
  },
  {
    quote: "I moved towns. I don’t know anyone here.",
    title: "The new-to-town person.",
    body: "Joined the local gym to meet people. Then realised swapping nods at the squat rack isn’t a friendship plan.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-bone py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-[640px] mb-10 sm:mb-14">
          <p className="eyebrow mb-3">The reality</p>
          <h2 className="display-h2 text-[clamp(30px,5.6vw,48px)] text-ink">
            You signed up. Then{" "}
            <span className="accent-italic">life happened.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-fg-muted">
            Most people stop going to the gym, not because they got lazy, but
            because nobody was expecting them. A mate keeps you accountable and
            fixes that, faster than any new program.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <article
              key={s.title}
              className="bg-bone-2 border border-linen-2 rounded-lg p-6 sm:p-7"
            >
              <blockquote className="font-body italic text-[18px] sm:text-[20px] leading-[1.35] text-ink m-0 pl-3.5 border-l-2 border-ochre">
                &ldquo;{s.quote}&rdquo;
              </blockquote>
              <h3 className="font-display font-bold text-[17px] sm:text-[18px] text-ink mt-4 mb-1.5">
                {s.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-fg-muted m-0">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
