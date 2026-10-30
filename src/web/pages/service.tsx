import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Headphones,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { findService, serviceUrl, slugify, waLink } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { telHref, useSite } from "../queries/site";
import { Duo } from "../components/bauhaus";
import { CtaBand } from "./index";
import { PackageCards, usePackagesFor } from "../components/content-ui";
import { useContent } from "../queries/content";

const STEPS = [
  { title: "Free Call", text: "Tell us what you need. We explain everything simply." },
  { title: "Share Details", text: "Send documents or details on WhatsApp. No office visit." },
  { title: "We Do the Work", text: "Our expert handles it and updates you on every step." },
  { title: "Done", text: "You get the final certificate / files on WhatsApp and email." },
];

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y-[1.5px] divide-ink border-2 border-ink bg-paper">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-ink"
          >
            {f.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-brand transition ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && <p className="px-5 pb-5 text-[15px] leading-relaxed">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

function Block({ icon: Icon, title, children }: { icon: typeof Users; title: string; children: React.ReactNode }) {
  return (
    <section className="card-bh p-6 sm:p-7">
      <h2 className="flex items-center gap-3 text-[22px] font-black">
        <span className="grid h-10 w-10 place-items-center bg-royal text-white">
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Ticks({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={`grid gap-3 ${cols ? "sm:grid-cols-2" : ""}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15.5px] text-ink">
          <span className="mt-1.5 h-3 w-3 shrink-0 bg-brand" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage() {
  const { cat: catSlug, service: serviceSlug } = useParams<{ cat: string; service: string }>();
  const { cat, service } = findService(catSlug, serviceSlug);
  const site = useSite();
  const waMsg = useContent().whatsapp;
  const pkgs = usePackagesFor(catSlug, service?.name);
  const edits = useContent().services;
  const [, navigate] = useLocation();
  const moved = !service ? edits.find((e) => e.cat === catSlug && e.original && slugify(e.original) === serviceSlug && !e.hidden && e.name !== e.original) : undefined;
  useEffect(() => {
    if (moved) navigate(serviceUrl(moved.cat, moved.name), { replace: true });
  }, [moved, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [catSlug, serviceSlug]);

  if (!cat || !service) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <Link to={cat ? `/services/${cat.slug}` : "/"} className="btn-brand mt-6">
          {cat ? `See all ${cat.title}` : "Go Home"}
        </Link>
      </div>
    );
  }

  const who = service.who ?? cat.who;
  const includes = service.includes ?? cat.includes;
  const docs = service.docs ?? cat.docs;
  const related = cat.services.filter((s) => s.name !== service.name).slice(0, 4);
  const isCert = cat.slug === "microsoft-certifications";
  const faqs = [
    ...(isCert ? [] : [{
      q: `How long does ${service.name} take?`,
      a: service.days
        ? `Usually ${service.days}. We tell you the exact timeline on the free call.`
        : "It depends on your needs. We give you a clear timeline on the free call.",
    }]),
    { q: "How much does it cost?", a: "The price depends on your needs. Our expert shares a clear price on the free call — no hidden charges." },
    { q: "Do I need to visit your office?", a: "No. Everything is done online — on phone and WhatsApp — from anywhere in India." },
    { q: "Will you help after the work is done?", a: "Yes. You can call or WhatsApp us any time if you have questions later." },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-cream">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:py-14">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-ink/60">
              <Link to="/" className="hover:text-brand">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to={`/services/${cat.slug}`} className="hover:text-brand">{cat.title}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-ink">{service.name}</span>
            </nav>
            <h1 className="rise mt-5 text-[38px] font-black leading-[1.02] tracking-[-0.04em] sm:text-[52px]">{service.name}</h1>
            <p className="rise mt-4 max-w-xl text-[18px] leading-relaxed text-ink/80" style={{ animationDelay: "100ms" }}>
              {service.text}
            </p>
            <div className="rise mt-6 flex flex-wrap gap-2.5 text-[13.5px] font-bold text-ink" style={{ animationDelay: "160ms" }}>
              {service.days && (
                <span className="flex items-center gap-2 border-2 border-ink bg-sun px-3.5 py-1.5">
                  <Clock className="h-4 w-4" /> {service.days}
                </span>
              )}
              <span className="flex items-center gap-2 border-2 border-ink bg-paper px-3.5 py-1.5">
                <ShieldCheck className="h-4 w-4 text-royal" /> 100% online
              </span>
              <span className="flex items-center gap-2 border-2 border-ink bg-paper px-3.5 py-1.5">
                <Headphones className="h-4 w-4 text-brand" /> Free expert call
              </span>
            </div>
            <div className="rise mt-8 flex flex-wrap gap-3 lg:hidden" style={{ animationDelay: "220ms" }}>
              <a href="#get-started" className="btn-brand">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="relative hidden h-[300px] lg:block">
            <div className="absolute inset-y-0 right-0 w-[86%] overflow-hidden rounded-tl-[100%] border-2 border-ink bg-royal">
              <Duo src={cat.image} eager className="absolute inset-0 !bg-transparent" />
            </div>
            <svg className="absolute bottom-4 left-0 h-16 w-16" viewBox="0 0 24 24" aria-hidden><path d="M12 2 23 22H1Z" fill="var(--color-sun)" /></svg>
            <span className="absolute left-[10%] top-2 h-12 w-12 rounded-full bg-brand" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <Block icon={Users} title="Who Is This For?">
              <Ticks items={who} />
            </Block>

            <Block icon={BadgeCheck} title="What You Get">
              <Ticks items={includes} cols />
            </Block>

            {docs && docs.length > 0 && (
              <Block icon={FileText} title="Documents Needed">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {docs.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 border-[1.5px] border-ink/25 bg-cream px-4 py-3 text-[15px] text-ink">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-royal" /> {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px]">Not sure about a document? Don't worry — we'll guide you on the call.</p>
              </Block>
            )}

            <Block icon={Clock} title="How It Works">
              <ol className="grid gap-4 sm:grid-cols-2">
                {STEPS.map((st, i) => (
                  <li key={st.title} className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[15px] font-black" style={{ background: ["var(--color-brand)", "var(--color-royal)", "var(--color-sun)", "var(--color-ink)"][i], color: i === 2 ? "var(--color-ink)" : "#fff" }}>{i + 1}</span>
                    <span>
                      <span className="block font-extrabold text-ink">{st.title}</span>
                      <span className="block text-[14.5px] leading-relaxed">{st.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Block>

            {pkgs.length > 0 && (
              <div>
                <h2 className="mb-4 text-[22px] font-black">Packages & Pricing</h2>
                <PackageCards packages={pkgs} compact />
              </div>
            )}

            <div>
              <h2 className="mb-4 text-[22px] font-black">Common Questions</h2>
              <Faq items={faqs} />
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="mb-4 text-[22px] font-black">Related Services</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.name}
                      to={serviceUrl(cat.slug, r.name)}
                      className="card-bh card-bh-hover group flex items-center justify-between gap-3 px-4 py-3.5"
                    >
                      <span>
                        <span className="block font-extrabold text-ink">{r.name}</span>
                        {r.days && <span className="block text-[13px] text-slate-500">{r.days}</span>}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand transition group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside id="get-started" className="scroll-mt-28 space-y-4 lg:sticky lg:top-28">
            <div className="card-bh overflow-hidden shadow-[6px_6px_0_var(--color-ink)]">
              <div className="border-b-2 border-ink bg-royal px-6 py-5">
                <p className="label-caps text-sun">Get Started</p>
                <h3 className="mt-1 text-xl font-bold !text-white">Talk to an Expert — Free</h3>
                <p className="mt-1 text-[14px] text-white/80">We'll call you back within 30 minutes.</p>
              </div>
              <div className="p-6">
                <LeadForm key={service.name} layout="stack" source={`service:${serviceSlug}`} defaultService={service.name} cta="Get Free Call" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={telHref(site.phone)} className="flex items-center justify-center gap-2 border-2 border-ink bg-paper py-3 font-bold text-ink hover:bg-ink hover:text-white">
                <Phone className="h-4 w-4 text-royal" /> Call Us
              </a>
              <a
                href={waLink(site.whatsapp, waMsg.serviceMessages[service.name] || waMsg.serviceMessage.replace("{service}", service.name))}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-ink bg-wa py-3 font-bold text-white hover:brightness-95"
              >
                <WaIcon /> WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
