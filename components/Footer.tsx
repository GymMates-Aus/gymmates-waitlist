import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
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
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-bone/70">
            <li>
              <a
                href="https://nextlevelechuca.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ochre transition duration-fast ease-brand"
              >
                Next Level Echuca
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@gymmates.com.au"
                className="hover:text-ochre transition duration-fast ease-brand"
              >
                hello@gymmates.com.au
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-ochre transition duration-fast ease-brand"
              >
                Privacy
              </a>
            </li>
          </ul>
        </nav>

        <p className="text-[12px] text-bone/45">
          Built in regional Victoria. © {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}
