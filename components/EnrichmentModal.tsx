"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

/**
 * Two-stage enrichment modal. Opens after the hero email-submit lands the
 * subscription in Beehiiv. The email is already saved at this point; this
 * modal collects bonus data.
 *
 * Skip / Close / ESC / backdrop-click all dismiss without losing the email,
 * which honours the "don't create friction" requirement.
 */

type Persona = "user" | "gym_owner" | null;

const AU_STATES = ["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

interface Props {
  open: boolean;
  subscriptionId: string | null;
  /** Called when the modal closes for any reason. Carries optional persona/data for the redirect target. */
  onDone: (info: {
    completed: boolean;
    persona: Persona;
  }) => void;
}

export default function EnrichmentModal({ open, subscriptionId, onDone }: Props) {
  const [persona, setPersona] = useState<Persona>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [attendsGym, setAttendsGym] = useState("");
  const [gymName, setGymName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errId = useId();

  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(
    (completed: boolean) => {
      onDone({ completed, persona });
    },
    [onDone, persona],
  );

  // ESC closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!persona) return;
    setBusy(true);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId,
          persona,
          firstName,
          lastName,
          // user persona sends attendsGym + gym address so partner outreach
          // can identify exactly which gym the member is asking us to chase.
          attendsGym: persona === "user" ? attendsGym : undefined,
          // gym_owner sends gymName as the official name (separate field).
          gymName: persona === "gym_owner" ? gymName : undefined,
          // suburb/state/postcode mean "gym's address" in both personas.
          suburb,
          state,
          postcode,
          honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Something went wrong. Skip this step if you like, your email is already in.");
        setBusy(false);
        return;
      }
      close(true);
    } catch {
      setError("Network hiccup. You can skip this step. Your email is already saved.");
      setBusy(false);
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────

  const inputCls =
    "w-full rounded-md bg-white/[0.12] border border-bone/25 text-bone placeholder:text-bone/55 px-3.5 py-3 text-[16px] focus:outline-none focus:border-bone focus:bg-white/[0.18] transition duration-fast ease-brand";
  // Selects need a different treatment: native <option> dropdowns render on a
  // browser-controlled background (often white), so cream-on-cream becomes
  // invisible the moment the dropdown opens. Give the select a cream card
  // look with ink text so both the closed state and the option list read
  // clearly against the orange modal.
  const selectCls =
    "w-full rounded-md bg-bone border border-bone/40 text-ink px-3.5 py-3 text-[16px] focus:outline-none focus:border-ink focus:bg-bone-2 transition duration-fast ease-brand";
  const labelCls =
    "font-body text-[11px] font-semibold uppercase tracking-eyebrow text-bone/55";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrich-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => close(false)}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      {/* Sheet/dialog. Ochre ground (same as the CTA button) with bone text.
          Rounded on all sides on every viewport; capped at max-h with scroll
          so long enrichment forms don't blow past the small mobile viewport. */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-[420px] sm:max-w-xl bg-ochre text-bone shadow-deep rounded-2xl border border-bone/15 overflow-hidden max-h-[90svh] overflow-y-auto"
      >
        <div className="px-5 sm:px-7 pt-5 sm:pt-7 pb-2 flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-bone/55 mb-1.5">You&rsquo;re in</p>
            <h2
              id="enrich-title"
              className="font-display font-extrabold text-[22px] sm:text-[26px] tracking-tight leading-tight"
            >
              {persona === null && "Are you a…"}
              {persona === "user" && "Help us bring GymMates to your gym."}
              {persona === "gym_owner" && "Let’s get GymMates at your gym."}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => close(false)}
            aria-label="Close"
            className="shrink-0 -mr-2 -mt-1 p-2 text-bone/60 hover:text-bone transition duration-fast ease-brand"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {persona === null && (
          <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-3">
            <div className="flex flex-col gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPersona("gym_owner")}
                className="text-left group bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.14] border border-white/15 hover:border-bone/70 rounded-lg p-4 sm:p-5 transition duration-fast ease-brand"
              >
                <p className="font-display font-bold text-[16px] sm:text-[17px] mb-1.5">
                  Gym Owner / Manager?
                </p>
                <p className="text-[13px] leading-[1.5] text-bone/70">
                  Bring GymMates to your members. Founding-partner pricing
                  locked for 24 months.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setPersona("user")}
                className="text-left group bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.14] border border-white/15 hover:border-bone/70 rounded-lg p-4 sm:p-5 transition duration-fast ease-brand"
              >
                <p className="font-display font-bold text-[16px] sm:text-[17px] mb-1.5">
                  Member of a Gym?
                </p>
                <p className="text-[13px] leading-[1.5] text-bone/70">
                  Want a mate at your gym? We&rsquo;ll let them know
                  you&rsquo;re keen, we just need some quick info.
                </p>
              </button>
            </div>

            <button
              type="button"
              onClick={() => close(false)}
              className="text-[13px] text-bone/55 hover:text-bone underline underline-offset-4 decoration-bone/40"
            >
              Skip for now. I&rsquo;ll finish later.
            </button>
          </div>
        )}

        {persona === "user" && (
          <form onSubmit={submit} className="px-5 sm:px-7 pb-6 sm:pb-7 pt-3">
            <div className="rounded-lg bg-ink/15 border border-ink/20 p-4 mb-5">
              <p className="text-[14px] leading-[1.55] text-bone/85">
                GymMates is free for users, but a partner program for gyms.
                We&rsquo;ll need to get them onboard. The more members who
                show interest, the louder the message lands!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>First name</span>
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputCls}
                  placeholder="First name"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Last name</span>
                <input
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputCls}
                  placeholder="Last name"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 mt-3">
              <span className={labelCls}>Gym you train at</span>
              <input
                type="text"
                autoComplete="organization"
                required
                value={attendsGym}
                onChange={(e) => setAttendsGym(e.target.value)}
                className={inputCls}
                placeholder="Your Gym&rsquo;s Name"
              />
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <span className={labelCls}>Gym suburb</span>
                <input
                  type="text"
                  autoComplete="address-level2"
                  required
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className={inputCls}
                  placeholder="Suburb"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Gym state</span>
                <select
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className={selectCls}
                >
                  <option value="" disabled style={{ color: "#1F2A1F" }}>
                    State
                  </option>
                  {AU_STATES.map((s) => (
                    <option key={s} value={s} style={{ color: "#1F2A1F" }}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Gym postcode</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className={inputCls}
                  placeholder="Postcode"
                  maxLength={4}
                />
              </label>
            </div>

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
              disabled={busy}
              className="btn mt-5 w-full bg-bone text-ink hover:bg-bone-2 active:scale-[0.98] px-5 py-3.5 text-[15px] disabled:opacity-70 disabled:cursor-wait"
            >
              {busy ? "Sending" : "Tell my gym"}
              {!busy && <span aria-hidden="true">→</span>}
            </button>
            {error && (
              <p id={errId} role="alert" className="text-[13px] mt-3 text-ink">
                {error}
              </p>
            )}
          </form>
        )}

        {persona === "gym_owner" && (
          <form onSubmit={submit} className="px-5 sm:px-7 pb-6 sm:pb-7 pt-3">
            <p className="text-[14px] leading-[1.55] text-bone/75 mb-5">
              Founding-partner pricing is locked for 24 months. We&rsquo;ll
              follow up within 24 hours to book a 15-minute call. No card, no
              commitment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>First name</span>
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputCls}
                  placeholder="Sam"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Last name</span>
                <input
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputCls}
                  placeholder="Taylor"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 mt-3">
              <span className={labelCls}>Gym name</span>
              <input
                type="text"
                autoComplete="organization"
                required
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className={inputCls}
                placeholder="Your Gym’s Name"
              />
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <span className={labelCls}>Suburb</span>
                <input
                  type="text"
                  autoComplete="address-level2"
                  required
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  className={inputCls}
                  placeholder="Suburb"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>State</span>
                <select
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className={selectCls}
                >
                  <option value="" disabled style={{ color: "#1F2A1F" }}>
                    State
                  </option>
                  {AU_STATES.map((s) => (
                    <option key={s} value={s} style={{ color: "#1F2A1F" }}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Postcode</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className={inputCls}
                  placeholder="Postcode"
                  maxLength={4}
                />
              </label>
            </div>

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
              disabled={busy}
              className="btn mt-5 w-full bg-bone text-ink hover:bg-bone-2 active:scale-[0.98] px-5 py-3.5 text-[15px] disabled:opacity-70 disabled:cursor-wait"
            >
              {busy ? "Sending" : "Join the foundation waitlist"}
              {!busy && <span aria-hidden="true">→</span>}
            </button>
            {error && (
              <p id={errId} role="alert" className="text-[13px] mt-3 text-ink">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
