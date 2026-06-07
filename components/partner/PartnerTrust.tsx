import Image from "next/image";

export default function PartnerTrust() {
  return (
    <section id="trust" className="bg-bone py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="eyebrow mb-4">Built by gym owners, for gym owners</p>
        <p className="text-[18px] sm:text-[20px] leading-[1.55] text-ink">
          The team behind Next Level Echuca built this. 13+ years inside a
          service-based gym. We figured out what makes members show up.
          Spoiler: <span className="accent-italic">it&rsquo;s mates.</span>
        </p>

        <dl className="mt-7 grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
          <div className="border-l-2 border-ochre pl-3 sm:pl-4 text-left">
            <dt className="font-display font-extrabold text-[24px] sm:text-[28px] leading-none text-ink tabular-nums tracking-tight">
              13+
            </dt>
            <dd className="text-[11px] sm:text-[12px] text-earth uppercase tracking-eyebrow mt-1">
              Years
            </dd>
          </div>
          <div className="border-l-2 border-ochre pl-3 sm:pl-4 text-left">
            <dt className="font-display font-extrabold text-[24px] sm:text-[28px] leading-none text-ink tabular-nums tracking-tight">
              80%
            </dt>
            <dd className="text-[11px] sm:text-[12px] text-earth uppercase tracking-eyebrow mt-1">
              Visitation
            </dd>
          </div>
          <div className="border-l-2 border-ochre pl-3 sm:pl-4 text-left">
            <dt className="font-display font-extrabold text-[24px] sm:text-[28px] leading-none text-ink tabular-nums tracking-tight">
              1,000+
            </dt>
            <dd className="text-[11px] sm:text-[12px] text-earth uppercase tracking-eyebrow mt-1">
              Members
            </dd>
          </div>
        </dl>

        <div className="mt-7 inline-flex items-center gap-3">
          <Image
            src="/handshake.png"
            alt=""
            width={28}
            height={28}
            className="opacity-90"
          />
          <a
            href="https://www.instagram.com/nextlevel_echucamoama/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[14px] font-semibold text-ink underline decoration-ochre decoration-2 underline-offset-4 hover:text-ochre-deep transition duration-fast ease-brand"
          >
            @nextlevel_echucamoama on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
