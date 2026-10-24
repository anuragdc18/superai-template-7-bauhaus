import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Minus, Plus, Star } from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { asset } from "../lib/demo";
import { useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { BAR, Duo, RHYTHM, Shape, SectionTitle, toneBg } from "../components/bauhaus";

const MS = CATEGORIES.find((c) => c.slug === "microsoft-certifications")!;
const OTHERS = CATEGORIES.filter((c) => c.slug !== "microsoft-certifications");
const TOTAL_SERVICES = CATEGORIES.reduce((n, c) => n + c.services.length, 0);

/* 1–2 · Hero: tabbed headline (the 4 slide topics) + duotone photo in a quarter circle */
const HERO_ORDER = [1, 0, 2, 3]; // Microsoft first, then the other slides
function Hero() {
  const [i, setI] = useState(0);
  const s = SLIDES[HERO_ORDER[i]];
  const words = s.title.split(" ");
  const last = words.pop();
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-x grid items-stretch gap-10 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-0">
        <div className="flex flex-col justify-center py-4 lg:py-16">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Choose a topic">
            {HERO_ORDER.map((idx, k) => (
              <button
                key={SLIDES[idx].tag}
                role="tab"
                aria-selected={k === i}
                onClick={() => setI(k)}
                className={`label-caps shrink-0 whitespace-nowrap border-2 px-3 py-1.5 text-[11px] transition ${
                  k === i ? "border-royal bg-royal text-white" : "border-ink/25 text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {SLIDES[idx].tag}
              </button>
            ))}
          </div>
          <p key={`l${i}`} className="label-caps rise mt-8 text-[13px] text-royal">{s.tag}</p>
          <h1 key={`h${i}`} className="rise mt-3 text-[44px] font-black leading-[0.98] tracking-[-0.04em] sm:text-[62px] lg:text-[72px]" style={{ animationDelay: "60ms" }}>
            {words.join(" ")} <span className="relative inline-block">{last}<span className="absolute -bottom-1 left-0 h-2 w-full bg-sun" /></span>
          </h1>
          <p key={`p${i}`} className="rise mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink/80" style={{ animationDelay: "120ms" }}>
            {s.text}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
            <Link to={s.link} className="btn-brand">
              {s.cta || s.linkText} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">Talk to an expert</Link>
          </div>
        </div>

        {/* composition: cobalt quarter circle + duotone photo + red circle + yellow triangle */}
        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[560px]">
          <div className="absolute bottom-0 right-0 h-[92%] w-[94%] overflow-hidden rounded-tl-[100%] bg-royal">
            <Duo src={asset("/images/hero.jpg")} eager className="absolute inset-0 !bg-transparent" imgClassName="object-[60%_20%] opacity-90" />
          </div>
          <span className="float-y absolute left-[2%] top-[4%] h-14 w-14 rounded-full bg-brand sm:left-[6%] sm:top-[8%] sm:h-28 sm:w-28" />
          <svg className="absolute bottom-[4%] left-0 h-12 w-12 sm:bottom-[6%] sm:left-[2%] sm:h-24 sm:w-24" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2 23 22H1Z" fill="var(--color-sun)" />
          </svg>
          <span className="absolute right-[4%] top-[4%] hidden h-14 w-14 bg-ink sm:block" />
          <span className="spin-slow absolute bottom-[10%] right-[-2%] hidden h-24 w-24 rounded-full border-[6px] border-dashed border-sun sm:block" />
        </div>
      </div>
    </section>
  );
}

/* 3 · boxed form */
function EnquiryBox() {
  return (
    <section id="enquiry" className="scroll-mt-28 bg-cream pb-8">
      <div className="container-x">
        <div className="relative border-2 border-ink bg-paper p-5 sm:p-7">
          <span className="absolute -top-3 left-6 bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Free call from an expert</span>
          <LeadForm cta="Get Free Call" />
        </div>
      </div>
    </section>
  );
}

/* 4 · yellow stats band */
const STATS = [
  { big: "4.8", small: "Google Rating" },
  { big: "1,000+", small: "Happy Clients" },
  { big: "Pan-India", small: "Service Coverage" },
  { big: "100%", small: "Online Process" },
];
function StatsBand() {
  return (
    <section className="border-y-2 border-ink bg-sun">
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.small}
            className={`py-7 text-center ${i % 2 === 1 ? "border-l-2 border-ink" : ""} ${i >= 2 ? "border-t-2 border-ink md:border-t-0" : ""} ${i === 2 ? "md:border-l-2" : ""}`}
          >
            <p className="text-[30px] font-black leading-none tracking-[-0.03em] text-ink sm:text-[40px]">{s.big}</p>
            <p className="mt-1.5 text-[14px] font-semibold text-ink">{s.small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 5 · poster wall of categories + wide cobalt Microsoft banner */
function PosterWall() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle label="Our services" title="What Do You Need Help With?" text="Pick a category to see every service inside." />
          <div className="mb-9 hidden items-center gap-3 md:flex" aria-hidden>
            <Shape kind="circle" tone="red" size={26} />
            <Shape kind="square" tone="blue" size={26} />
            <Shape kind="triangle" tone="yellow" size={30} />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OTHERS.map((c, i) => {
            const r = RHYTHM[i];
            return (
              <Link key={c.slug} to={`/services/${c.slug}`} className="card-bh card-bh-hover group flex flex-col">
                <span className="h-2.5" style={{ background: toneBg(BAR[i]) }} />
                <div className="relative">
                  <Duo src={c.image} className="h-44 border-b-2 border-ink" imgClassName="transition duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-0 right-4 z-[2] grid h-12 w-12 translate-y-1/2 place-items-center border-2 border-ink bg-paper">
                    <Shape kind={r.kind} tone={r.tone} size={22} />
                  </span>
                </div>
                <div className="flex flex-1 items-end justify-between gap-3 px-5 pb-5 pt-6">
                  <div>
                    <h3 className="text-[19px] font-extrabold leading-tight">{c.title}</h3>
                    <p className="mt-1 text-[14px] text-ink/65">{c.services.length} Services</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink transition group-hover:bg-ink group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <Link to={`/services/${MS.slug}`} className="group relative mt-8 grid overflow-hidden border-2 border-ink bg-royal lg:grid-cols-[1.15fr_1fr]">
          <div className="relative z-10 p-7 sm:p-10">
            <p className="label-caps text-sun">{MS.services.length} exams · guided training</p>
            <h3 className="mt-3 text-[30px] font-black leading-tight !text-white sm:text-[40px]">{MS.title}</h3>
            <p className="mt-3 max-w-md text-[16px] text-white/85">{MS.short}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {MS.services.map((s) => (
                <span key={s.name} className="border border-white/50 px-2.5 py-1 text-[12px] font-bold tracking-wide text-white">
                  {s.name.split(":")[0]}
                </span>
              ))}
            </div>
            <span className="mt-7 inline-flex items-center gap-2 border-2 border-white bg-white px-6 py-3 text-[15px] font-bold text-ink transition group-hover:bg-sun group-hover:border-sun">
              Browse All Exams <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="relative min-h-[240px]">
            <Duo src={asset("/images/ms-banner.jpg")} eager className="absolute inset-0 !bg-royal" imgClassName="object-[70%_30%]" />
            <div className="absolute inset-y-0 left-0 z-[2] hidden w-1/3 bg-gradient-to-r from-royal to-transparent lg:block" />
          </div>
        </Link>
      </div>
    </section>
  );
}

/* 6 · popular services with primitive-shape icons */
function Popular() {
  return (
    <section className="border-t-2 border-ink bg-paper py-16 sm:py-20">
      <div className="container-x">
        <SectionTitle center label="Most asked" title="Most Popular Services" text="These are what most of our customers start with." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR.map((p, i) => {
            const r = RHYTHM[i];
            return (
              <Link key={p.name} to={serviceUrl(p.cat, p.name)} className="card-bh card-bh-hover group flex flex-col p-5">
                <Shape kind={r.kind} tone={r.tone} size={26} />
                <h3 className="mt-4 text-[17px] font-extrabold leading-snug">{p.name}</h3>
                <p className="mt-1 text-[14px] text-ink/60">{p.days}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-bold text-brand group-hover:gap-2.5">
                  Know More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 7 · by the numbers (typographic) */
function Numbers() {
  const max = Math.max(...CATEGORIES.map((c) => c.services.length));
  const big = [
    { n: String(CATEGORIES.length), t: "Service areas", tone: "red" as const },
    { n: `${TOTAL_SERVICES}+`, t: "Services under one roof", tone: "blue" as const },
    { n: String(MS.services.length), t: "Microsoft exams we train for", tone: "yellow" as const },
    { n: "30", t: "Minutes to call you back", tone: "ink" as const },
  ];
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x">
        <SectionTitle label="By the numbers" title="Everything Your Business Needs, Counted." />
        <div className="grid border-2 border-ink bg-paper lg:grid-cols-[1.2fr_1fr]">
          <div className="grid grid-cols-2">
            {big.map((b, i) => (
              <div key={b.t} className={`relative flex flex-col justify-end p-6 sm:p-8 ${i % 2 === 1 ? "border-l-2 border-ink" : ""} ${i >= 2 ? "border-t-2 border-ink" : ""}`}>
                <span className="absolute right-4 top-4 h-3 w-3" style={{ background: toneBg(b.tone) }} />
                <p className="text-[56px] font-black leading-none tracking-[-0.05em] text-ink sm:text-[84px]">{b.n}</p>
                <p className="mt-2 max-w-[180px] text-[14px] font-semibold leading-snug text-ink/75">{b.t}</p>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-ink p-6 sm:p-8 lg:border-l-2 lg:border-t-0">
            <p className="label-caps text-ink">Services in each area</p>
            <ul className="mt-5 space-y-3.5">
              {CATEGORIES.map((c, i) => (
                <li key={c.slug}>
                  <Link to={`/services/${c.slug}`} className="group block">
                    <span className="flex items-baseline justify-between text-[14px] font-bold text-ink">
                      <span className="group-hover:text-brand">{c.title}</span>
                      <span>{c.services.length}</span>
                    </span>
                    <span className="mt-1.5 block h-3 border-[1.5px] border-ink bg-cream">
                      <span className="block h-full transition-all duration-500 group-hover:brightness-90" style={{ width: `${(c.services.length / max) * 100}%`, background: toneBg(BAR[i]) }} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8 · process on a black band */
const STEPS = [
  { title: "Tell Us What You Need", text: "Fill the form or call us. It takes 1 minute.", tone: "red" as const },
  { title: "Share Your Documents", text: "Send them on WhatsApp or email. No office visit.", tone: "blue" as const },
  { title: "We Get It Done", text: "You get updates at every step until it's complete.", tone: "yellow" as const },
];
function Process() {
  return (
    <section className="bg-cream pb-16 sm:pb-20">
      <div className="container-x">
        <div className="relative overflow-hidden bg-ink px-6 py-10 sm:px-10 sm:py-12">
          <span className="stripes absolute -right-10 -top-10 hidden h-40 w-56 rotate-12 opacity-80 md:block" aria-hidden />
          <h2 className="relative text-[28px] font-black !text-white sm:text-[36px]">Simple 3-Step Process</h2>
          <div className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
            {STEPS.map((s, i) => (
              <div key={s.title} className={`flex gap-4 md:px-7 ${i > 0 ? "md:border-l md:border-white/25" : "md:pl-0"}`}>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-[18px] font-black text-white" style={{ background: toneBg(s.tone), color: s.tone === "yellow" ? "var(--color-ink)" : "#fff" }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[18px] font-extrabold !text-white">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 9 · serving all of India — block grid of cities */
const CITIES = ["Hyderabad", "Bengaluru", "Mumbai", "Delhi", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Vizag"];
const TILE_PATTERN: ("city" | "red" | "blue" | "yellow" | "ink")[] = [
  "city", "blue", "city", "city", "red", "city",
  "city", "city", "yellow", "city", "city", "ink",
  "red", "city", "city", "blue", "city", "city",
];
function India() {
  const site = useSite();
  let c = 0;
  const home = site.city.split(",")[0].trim();
  return (
    <section className="border-y-2 border-ink bg-paper py-16 sm:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle label="Pan-India" title="Serving Businesses All Over India." />
          <p className="-mt-4 max-w-md text-[16px] leading-relaxed">
            Based in <strong className="text-ink">{site.city}</strong>, working with clients in every state. Everything happens online — share documents on WhatsApp,
            get updates on your phone, receive your certificates by email.
          </p>
          <ul className="mt-6 space-y-3">
            {["No office visit — everything on WhatsApp & email", "Updates at every step until it's done", `Experts available ${site.hours}`].map((t, i) => (
              <li key={t} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                <Shape kind={RHYTHM[i].kind} tone={RHYTHM[i].tone} size={14} /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-6">
          {TILE_PATTERN.map((t, i) => {
            if (t !== "city") return <div key={i} className="aspect-square" style={{ background: toneBg(t) }} />;
            const name = CITIES[c++ % CITIES.length];
            const isHome = name === home;
            return (
              <div key={i} className={`flex aspect-square flex-col justify-between p-2.5 ${isHome ? "bg-paper" : "bg-cream"}`}>
                <span className={`h-2.5 w-2.5 ${isHome ? "rounded-full bg-brand" : "bg-ink/70"}`} />
                <span className={`text-[12px] font-bold leading-tight sm:text-[13px] ${isHome ? "text-brand" : "text-ink"}`}>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 10 · trust + testimonials */
const WHY = [
  { title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];
const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply." },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it." },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week." },
];
function TrustReviews() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.55fr]">
        <div>
          <h2 className="text-[28px] font-black leading-tight sm:text-[32px]">Why Businesses Trust Us</h2>
          <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
            {WHY.map((w) => (
              <li key={w.title} className="flex gap-4 py-4">
                <span className="mt-1 h-4 w-4 shrink-0 bg-brand" />
                <span>
                  <span className="block font-extrabold text-ink">{w.title}</span>
                  <span className="block text-[15px]">{w.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-[28px] font-black leading-tight sm:text-[32px]">What Our Clients Say</h2>
            <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
              <span className="text-[30px] font-black leading-none">4.8</span>
              <span className="flex text-sun">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-5 w-5 fill-current" />)}</span>
              on Google
            </p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure key={r.name} className="card-bh flex flex-col p-5">
                <span className="text-[44px] font-black leading-none" style={{ color: toneBg(BAR[i]) }}>“</span>
                <blockquote className="-mt-3 flex-1 text-[15px] leading-relaxed text-ink">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/15 pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full text-[15px] font-black text-white" style={{ background: toneBg(["red", "blue", "ink"][i] as "red") }}>
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-extrabold text-ink">{r.name}</span>
                    <span className="text-[13px] text-ink/60">{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 · FAQ as a bordered table */
const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-cream pb-16 sm:pb-20">
      <div className="container-x">
        <p className="mb-5 flex items-center justify-center gap-3 text-[15px] font-extrabold text-ink">
          <span className="h-4 w-4 bg-brand" /> FAQ <span className="font-semibold text-ink/70">Common Questions</span>
        </p>
        <div className="border-2 border-ink bg-paper">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={i > 0 ? "border-t-[1.5px] border-ink" : ""}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center gap-4 px-5 py-4 text-left">
                  <span className="hidden w-8 shrink-0 text-[13px] font-black text-ink/40 sm:block">0{i + 1}</span>
                  <span className="flex-1 text-[15.5px] font-bold text-ink">{f.q}</span>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center border-[1.5px] border-ink transition ${isOpen ? "bg-ink text-white" : "text-ink"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed sm:pl-[4.25rem]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 12 · red CTA band (also used on inner pages) */
export function CtaBand() {
  const site = useSite();
  return (
    <section className="relative overflow-hidden border-t-2 border-ink bg-brand">
      <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[18px] border-white/15" aria-hidden />
      <div className="container-x relative flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <h2 className="text-[28px] font-black !text-white sm:text-[36px]">Ready to Grow Your Business?</h2>
          <p className="mt-1.5 text-[16px] text-white/90">Talk to our expert today. The first consultation is free.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-ink">Get Free Consultation</Link>
          <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-outline-light">
            <WaIcon /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <EnquiryBox />
      <StatsBand />
      <PosterWall />
      <Popular />
      <Numbers />
      <Process />
      <India />
      <TrustReviews />
      <Faq />
      <CtaBand />
    </>
  );
}
