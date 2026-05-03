"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PUBLIC_BASE = "https://waitlist.gymmates.com.au"; // TODO: env-driven base URL.

const SHARE_TEXT =
  "Just joined the GymMates waitlist. They pair you with one mate at your gym so you actually show up. Free for members.";

function IconCopy() {
  return (
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Confirmed({
  refCode,
  position,
}: {
  refCode: string;
  position: number;
}) {
  // Build the shareable URL on the client so it picks up the deployed origin
  // when available, with a sensible static fallback for SSR.
  const shareUrl = useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.origin : PUBLIC_BASE;
    return `${base}/?ref=${encodeURIComponent(refCode)}`;
  }, [refCode]);

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // Fallback for old browsers
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  }

  function tryNativeShare() {
    const nav = navigator as Navigator & {
      share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
    };
    if (typeof nav.share === "function") {
      nav
        .share({
          title: "GymMates",
          text: SHARE_TEXT,
          url: shareUrl,
        })
        .catch(() => {
          /* user cancelled. */
        });
    } else {
      copyLink();
    }
  }

  const enc = encodeURIComponent;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${enc(`${SHARE_TEXT} ${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${enc(SHARE_TEXT)}&url=${enc(shareUrl)}`,
    // Instagram doesn't accept a share intent. Native share + copy-link cover that case.
  };

  return (
    <section className="bg-forest text-bone min-h-[100svh] py-14 sm:py-20">
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 mb-10 sm:mb-12 hover:opacity-80 transition duration-fast ease-brand"
        >
          <Image
            src="/handshake.png"
            alt=""
            width={28}
            height={28}
            className="invert brightness-0 opacity-95"
          />
          <span className="font-display font-extrabold text-[18px] tracking-tight">
            GymMates
          </span>
        </Link>

        <p className="eyebrow text-bone/55 mb-3">You&rsquo;re in</p>
        <h1 className="display-hero text-[clamp(40px,9vw,80px)]">
          You&rsquo;re on<br />
          <span className="accent-italic normal-case">the list.</span>
        </h1>

        <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.55] text-bone/80 max-w-[40ch] mx-auto">
          We&rsquo;ll be in touch when your gym signs on, plus once a month with a
          short note from the build.
        </p>

        {/* Ochre handshake mark, replacing the queue-position number. The
            position itself isn't material to the user, but the mark gives the
            page a focal point and reinforces the brand. */}
        <div
          className="mt-9 mx-auto inline-grid place-items-center w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white/[0.04] border border-white/10"
          aria-hidden="true"
        >
          <div
            className="w-20 h-20 sm:w-24 sm:h-24"
            style={{
              backgroundColor: "var(--ochre)",
              WebkitMaskImage: "url(/handshake.png)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url(/handshake.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </div>
        {/* Position is preserved internally for analytics later, just not
            displayed on this page anymore. */}
        <span className="sr-only">You are number {position} on the waitlist.</span>

        {/* Referral block */}
        <div className="mt-10 sm:mt-12 bg-white/[0.04] border border-white/10 rounded-lg p-6 sm:p-8 text-left">
          <h2 className="font-display font-bold text-[20px] sm:text-[22px] mb-1">
            Tell your mates.
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.55] text-bone/70 mb-5">
            The more mates we get on GymMates, the more people we can help. It&rsquo;s
            free, and might positively change their life.
          </p>

          <label className="block">
            <span className="eyebrow text-bone/55 mb-2 block">Your referral link</span>
            <div className="flex gap-2">
              <input
                readOnly
                value={shareUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 min-w-0 rounded-md bg-white/[0.08] border border-white/15 text-bone text-[14px] px-3 py-2.5 font-mono"
                aria-label="Your referral link"
              />
              <button
                type="button"
                onClick={copyLink}
                className="btn btn-primary px-3.5 py-2.5 text-[14px]"
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <IconCheck /> Copied
                  </>
                ) : (
                  <>
                    <IconCopy /> Copy
                  </>
                )}
              </button>
            </div>
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={tryNativeShare}
              className="btn px-3.5 py-2.5 text-[13px] bg-white/10 text-bone hover:bg-white/15 border border-white/10"
            >
              Share to Instagram / Stories
            </button>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-3.5 py-2.5 text-[13px] bg-white/10 text-bone hover:bg-white/15 border border-white/10"
            >
              WhatsApp
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-3.5 py-2.5 text-[13px] bg-white/10 text-bone hover:bg-white/15 border border-white/10"
            >
              Facebook
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-3.5 py-2.5 text-[13px] bg-white/10 text-bone hover:bg-white/15 border border-white/10"
            >
              X / Twitter
            </a>
          </div>

          <p className="mt-5 text-[12px] text-bone/45">
            Code: <span className="font-mono text-bone/65">{refCode}</span>
          </p>
        </div>

        <p className="mt-10 text-[13px] text-bone/55">
          Wrong email or want to leave the list?{" "}
          <a
            href="mailto:support@gymmates.com.au"
            className="text-bone underline decoration-ochre decoration-2 underline-offset-4 hover:text-ochre"
          >
            support@gymmates.com.au
          </a>
        </p>
      </div>
    </section>
  );
}
