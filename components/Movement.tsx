const buildList = [
  "We post the build, the wins, and the bits we got wrong.",
  "We design it around real members, not personas.",
  "We open the matching logic so you can poke holes in it.",
  "We answer DMs. Founder line, no support tickets.",
];

const memberList = [
  "Early access ahead of the public launch.",
  "Founding-member badge in your profile.",
  "First-match priority on launch day.",
  "A vote on the features we ship next.",
  "Monthly “behind the build” notes. No fluff.",
];

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mt-0.5 text-ochre shrink-0"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[15px] leading-[1.55]">{children}</span>
    </li>
  );
}

export default function Movement() {
  return (
    <section id="movement" className="bg-ink text-bone py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-[680px] mb-10 sm:mb-14">
          <p className="eyebrow text-bone/55 mb-3">Building in public</p>
          <h2 className="display-h2 text-[clamp(30px,5.6vw,48px)]">
            Watch us build it.{" "}
            <span className="accent-italic">Tell us when we get it wrong.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-bone/70">
            GymMates isn’t shipping out of a closed door and onto an app store. We’re
            making it in public, with the people who’ll use it. Joining the waitlist
            puts you in that room.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-7">
          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6 sm:p-8">
            <h3 className="font-display font-bold text-[18px] sm:text-[20px] mb-4">
              What we’re doing
            </h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {buildList.map((line) => (
                <CheckLine key={line}>{line}</CheckLine>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6 sm:p-8">
            <h3 className="font-display font-bold text-[18px] sm:text-[20px] mb-4">
              What you get on the list
            </h3>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {memberList.map((line) => (
                <CheckLine key={line}>{line}</CheckLine>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
