import Image from "next/image";

export default function Trust() {
  return (
    <section id="trust" className="bg-bone py-14 sm:py-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="eyebrow mb-4">Built by gym people</p>
        <p className="text-[18px] sm:text-[20px] leading-[1.55] text-ink">
          Made by the team behind Next Level Echuca, a regional gym that&rsquo;s spent 13+ years
          working out what makes members actually show up. Spoiler:{" "}
          <span className="accent-italic">it&rsquo;s mates.</span>
        </p>

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

        {/* TODO(asset): replace handshake with the Next Level Echuca logo when supplied. */}
      </div>
    </section>
  );
}
