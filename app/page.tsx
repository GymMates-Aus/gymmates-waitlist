import Hero from "@/components/Hero";
import LearnMore from "@/components/LearnMore";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

// The waitlist landing page is intentionally a two-section page now: the
// hero (with the inline signup form) and a Learn More bridge that sends
// curious visitors to the full marketing site at gymmates-app.netlify.app
// for the deeper product story (pricing, matching, founders, proof).
//
// Problem / Solution / Movement / Trust / FAQ / FinalCTA components are
// preserved in the repo for reuse on the partner page and for future
// A/B testing, but they're no longer rendered on this route.

export default function Page() {
  return (
    <>
      <main className="sticky-pad">
        <Hero />
        <LearnMore />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
