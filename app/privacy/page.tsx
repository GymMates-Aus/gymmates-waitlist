import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy · GymMates",
  description: "How GymMates handles waitlist data.",
};

// TODO(legal): replace this stub with real privacy copy reviewed by a solicitor
//   ahead of public launch. Below is a working placeholder so the link in the
//   footer doesn't 404.

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-bone min-h-[100svh] py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <Link
            href="/"
            className="eyebrow text-earth hover:text-ochre transition duration-fast ease-brand"
          >
            ← Back
          </Link>
          <h1 className="display-h2 text-[clamp(28px,5vw,40px)] text-ink mt-6 mb-4">
            Privacy.
          </h1>
          <p className="text-fg-muted text-[16px] leading-[1.6] mb-4">
            We&rsquo;re collecting your email so we can tell you when GymMates is ready
            and once a month send a short note about the build. That&rsquo;s it.
          </p>
          <p className="text-fg-muted text-[16px] leading-[1.6] mb-4">
            We don&rsquo;t sell your email. We don&rsquo;t hand it to advertisers. You
            can unsubscribe in one click from any email we send.
          </p>
          <p className="text-fg-muted text-[16px] leading-[1.6] mb-4">
            If you want your email removed from our records, write to{" "}
            <a
              href="mailto:support@gymmates.com.au"
              className="text-ink underline decoration-ochre decoration-2 underline-offset-4"
            >
              support@gymmates.com.au
            </a>{" "}
            and we&rsquo;ll do it within seven days.
          </p>
          <p className="text-earth text-[13px] mt-10">
            This is a placeholder. Full privacy policy coming before public launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
