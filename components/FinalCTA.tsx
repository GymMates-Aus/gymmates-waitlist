import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section id="final" className="bg-bone py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <p className="eyebrow mb-3">Last call</p>
        <h2 className="display-h2 text-[clamp(32px,6vw,52px)] text-ink uppercase">
          Get on the list.<br />
          <span className="accent-italic normal-case">we&rsquo;ll save you a mate.</span>
        </h2>
        <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.55] text-fg-muted">
          Free forever for members. Unsubscribe any time. No spam, no selling your
          email.
        </p>

        <div className="mt-7 max-w-[440px] mx-auto text-left">
          <WaitlistForm id="final-form" variant="light" cta="I want in" />
        </div>
      </div>
    </section>
  );
}
