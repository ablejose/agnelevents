import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { copy, site, telLink } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto max-w-shell px-6 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.24em] text-saffron">{site.kicker}</p>
            <p className="body-copy mt-4 max-w-xs text-ivory/60">{site.tagline}</p>

            {(site.instagram || site.facebook) && (
              <div className="mt-4 flex items-center gap-3">
                {site.instagram && (
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-colors hover:border-saffron hover:text-saffron"
                  >
                    <Instagram size={16} />
                  </a>
                )}
                {site.facebook && (
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 text-ivory/80 transition-colors hover:border-saffron hover:text-saffron"
                  >
                    <Facebook size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="space-y-3 font-sans text-sm text-ivory/80">
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-saffron" /> {site.address}</p>
            <p className="flex items-center gap-2"><Clock size={16} className="text-saffron" /> {site.hours}</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-saffron" /> <a href={telLink} className="link-underline">{site.phone}</a></p>
          </div>
          <div className="font-sans text-sm text-ivory/70">
            <p className="eyebrow text-saffron">{copy.footer.areasLabel}</p>
            <p className="mt-3">{site.serviceAreas.join(" · ")}</p>
          </div>
        </div>

        <div className="mt-12 h-px w-full" style={{ background: "rgba(196,137,46,0.35)" }} />
        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center font-sans text-xs text-ivory/60 md:flex-row md:text-left">
          <p>© {year} {site.fullName} · {site.city}</p>
          <p>{copy.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
