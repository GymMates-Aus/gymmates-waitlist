"use client";

import { useState, FormEvent, useId } from "react";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

interface FormState {
  name: string;
  role: string;
  gym: string;
  town: string;
  size: string;
  email: string;
  notes: string;
  honeypot: string;
}

const EMPTY: FormState = {
  name: "",
  role: "Owner",
  gym: "",
  town: "",
  size: "Under 50",
  email: "",
  notes: "",
  honeypot: "",
};

export default function PartnerForm() {
  const [v, setV] = useState<FormState>(EMPTY);
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!v.name.trim() || !v.gym.trim()) {
      setError("Tell us your name and your gym.");
      setState("error");
      return;
    }
    if (!isEmail(v.email)) {
      setError("That doesn't look like an email.");
      setState("error");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Something went wrong. Try again in a moment.");
        setState("error");
        return;
      }
      setState("ok");
    } catch {
      setError("Network hiccup. Try again.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="bg-bone-2 border border-eucalypt/40 rounded-lg p-7 text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-3 inline-grid place-items-center w-12 h-12 rounded-full bg-eucalypt/15 text-eucalypt"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-[20px] text-ink mb-1">
          You&rsquo;re in.
        </h3>
        <p className="text-[14px] leading-[1.55] text-fg-muted">
          We&rsquo;ll be in touch within 24 hours. Your founding-partner spot is held
          for the next 7 days.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-md bg-bone border border-linen-2 text-ink placeholder:text-earth/60 px-3.5 py-3 text-[15px] focus:outline-none focus:border-ochre focus:bg-bone-2 transition duration-fast ease-brand";
  const labelCls =
    "font-body text-[11px] font-semibold uppercase tracking-eyebrow text-earth";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-bone-2 border border-linen-2 rounded-lg p-6 sm:p-8"
      aria-describedby={error ? errorId : undefined}
    >
      <h3 className="font-display font-extrabold text-[22px] text-ink mb-1 tracking-tight">
        Pre-register your gym.
      </h3>
      <p className="text-[13px] text-fg-muted mb-5">
        Fifteen-minute call follows. No card, no commitment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your name</span>
          <input
            type="text"
            autoComplete="name"
            required
            placeholder="Sam Taylor"
            value={v.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Role</span>
          <select
            value={v.role}
            onChange={(e) => set("role", e.target.value)}
            className={inputCls}
          >
            <option>Owner</option>
            <option>Manager</option>
            <option>Head coach</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 mt-3">
        <span className={labelCls}>Gym name</span>
        <input
          type="text"
          required
          placeholder="Next Level Fitness Echuca"
          value={v.gym}
          onChange={(e) => set("gym", e.target.value)}
          className={inputCls}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Town</span>
          <input
            type="text"
            placeholder="Echuca"
            value={v.town}
            onChange={(e) => set("town", e.target.value)}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Active members</span>
          <select
            value={v.size}
            onChange={(e) => set("size", e.target.value)}
            className={inputCls}
          >
            <option>Under 50</option>
            <option>50 to 150</option>
            <option>150 to 400</option>
            <option>400+</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 mt-3">
        <span className={labelCls}>Email</span>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="sam@yourgym.com.au"
          value={v.email}
          onChange={(e) => set("email", e.target.value)}
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1.5 mt-3">
        <span className={labelCls}>Anything you&rsquo;d like us to know</span>
        <textarea
          placeholder="Which members are you trying to keep showing up? What have you tried?"
          value={v.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          className={`${inputCls} resize-vertical min-h-[90px] font-body`}
        />
      </label>

      {/* Honeypot */}
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        value={v.honeypot}
        onChange={(e) => set("honeypot", e.target.value)}
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn btn-primary w-full mt-5 px-4 py-3.5 text-[15px] disabled:opacity-70 disabled:cursor-wait"
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
            Pre-register my gym
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-[13px] mt-3 text-[#A7442B]"
        >
          {error}
        </p>
      )}

      <p className="text-[12px] text-earth mt-4 leading-[1.5]">
        We&rsquo;ll only use these details to talk to you about onboarding your gym.
        No spam, no selling lists.
      </p>
    </form>
  );
}
