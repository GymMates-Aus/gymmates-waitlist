import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Confirmed from "@/components/Confirmed";

export const metadata: Metadata = {
  title: "You’re on the list · GymMates",
  description: "You’re on the GymMates waitlist. Refer mates and move up the queue.",
  robots: { index: false, follow: false },
};

export default function ConfirmedPage({
  searchParams,
}: {
  searchParams?: { ref?: string; pos?: string };
}) {
  const ref = (searchParams?.ref || "").toUpperCase().slice(0, 8) || "PREVIEW";
  const positionParam = parseInt(searchParams?.pos ?? "", 10);
  // TODO(referral): replace with the real position from the API/DB lookup.
  const position = Number.isFinite(positionParam) && positionParam > 0 ? positionParam : 248;

  return (
    <>
      <main>
        <Confirmed refCode={ref} position={position} />
      </main>
      <Footer />
    </>
  );
}
