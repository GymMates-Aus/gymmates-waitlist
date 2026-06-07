import Image from "next/image";

const WEBSITE_URL = "https://gymmates-app.netlify.app/";

export default function LearnMore() {
  return (
    <section
      id="learn-more"
      className="bg-bone-2 py-20 sm:py-28"
      aria-label="Learn more about GymMates"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Image
          src="/handshake.png"
          alt=""
          width={48}
          height={48}
          className="mx-auto mb-5 opacity-90"
        />

        <p className="eyebrow mb-3">Want more detail?</p>

        <h2 className="display-h2 text-[clamp(30px,6vw,48px)] text-ink">
          Read everything we&rsquo;ve built so far.{" "}
          <span className="accent-italic">On one page.</span>
        </h2>

        <p className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] leading-[1.55] text-fg-muted max-w-[44ch] mx-auto">
          The pricing, the matching system, the proof, the founders. Everything
          we know, ready for you to skim before you join the list.
        </p>

        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ink mt-7 sm:mt-8 px-6 py-3.5 text-[15px]"
        >
          Learn more about GymMates
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>

        <p className="mt-4 text-[12px] text-earth">
          Opens in a new tab. The waitlist stays right here when you&rsquo;re done.
        </p>
      </div>
    </section>
  );
}
