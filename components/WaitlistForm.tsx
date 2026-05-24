"use client";

import { useState, FormEvent, useId, useEffect } from "react";
import { useRouter } from "next/navigation";
import EnrichmentModal from "./EnrichmentModal";

type Variant = "dark" | "light";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

interface SignupResult {
  ref: string;
  position: number;
  subscriptionId: string | null;
}

export default function WaitlistForm({
  id,
  variant = "dark",
  cta = "Join the waitlist",
  className = "",
}: {
  id?: string;
  variant?: Variant;
  cta?: string;
  className?: string;
}) {
  const router = useRouter();
  const [referredBy, setReferredBy] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setReferredBy(ref);
  }, []);
  const errorId = useId();

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // After the email-only POST succeeds, store the result and open the modal.
  // The redirect to /confirmed only happens when the modal closes (skip,
  // backdrop, ESC, or successful enrichment submit).
  const [signupResult, setSignupResult] = useState<SignupResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dark = variant === "dark";

  const inputCls = dark
    ? "w-full rounded-md bg-white/[0.08] border border-white/20 text-bone placeholder:text-bone/40 px-3.5 py-3 text-[16px] focus:outline-none focus:border-ochre focus:bg-white/[0.12] transition duration-fast ease-brand"
    : "w-full rounded-md bg-bone-2 border border-linen-2 text-ink placeholder:text-earth/60 px-3.5 py-3 text-[16px] focus:outline-none focus:border-ochre focus:bg-white transition duration-fast ease-brand";

  const btnCls = dark
    ? "btn btn-primary w-full px-4 py-3.5 text-[15px]"
    : "btn btn-ink w-full px-4 py-3.5 text-[15px]";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!isEmail(email)) {
      setError("That doesn't look like an email.");
      setState("error");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref: referredBy, honeypot }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Something went wrong. Try again in a moment.");
        setState("error");
        return;
      }
      // TODO(analytics): fire conversion event here once analytics is wired.
      setSignupResult({
        ref: data.ref,
        position: data.position,
        subscriptionId: data.subscriptionId ?? null,
      });
      setModalOpen(true);
      setState("idle");
    } catch {
      setError("Network hiccup. Try again.");
      setState("error");
    }
  }

  function handleModalDone() {
    setModalOpen(false);
    if (!signupResult) return;
    const qs = new URLSearchParams({
      ref: signupResult.ref,
      pos: String(signupResult.position),
    });
    router.push(`/confirmed?${qs.toString()}`);
  }

  return (
    <>
      <form
        id={id}
        onSubmit={onSubmit}
        noValidate
        className={`flex flex-col gap-2.5 ${className}`}
        aria-describedby={error ? errorId : undefined}
      >
        <label htmlFor={`${id ?? "wl"}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id ?? "wl"}-email`}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          aria-invalid={state === "error" ? true : undefined}
        />

        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={state === "submitting"}
          className={`${btnCls} disabled:opacity-70 disabled:cursor-wait`}
        >
          {state === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                aria-hidden="true"
              />
              Sending
            </span>
          ) : (
            <>
              {cta}
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        {error && (
          <p
            id={errorId}
            role="alert"
            className={`text-[13px] mt-1 ${dark ? "text-[#FFB39A]" : "text-[#A7442B]"}`}
          >
            {error}
          </p>
        )}
      </form>

      <EnrichmentModal
        open={modalOpen}
        subscriptionId={signupResult?.subscriptionId ?? null}
        onDone={handleModalDone}
      />
    </>
  );
}
