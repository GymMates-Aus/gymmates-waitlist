import type { Metadata } from "next";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnerHow from "@/components/partner/PartnerHow";
import PartnerPricing from "@/components/partner/PartnerPricing";
import FoundingCounter from "@/components/partner/FoundingCounter";
import PartnerTrust from "@/components/partner/PartnerTrust";
import PartnerFAQ from "@/components/partner/PartnerFAQ";
import PartnerStickyCTA from "@/components/partner/PartnerStickyCTA";
import Footer from "@/components/Footer";

const TITLE = "GymMates · Pre-register your gym";
const DESC =
  "Founding partner gyms lock in pricing for 24 months. White-glove onboarding, your members never pay. Pre-register before public launch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export default function PartnerPage() {
  return (
    <>
      <main className="sticky-pad">
        <PartnerHero />
        <PartnerHow />
        <PartnerPricing />
        <FoundingCounter />
        <PartnerTrust />
        <PartnerFAQ />
      </main>
      <Footer />
      <PartnerStickyCTA />
    </>
  );
}
