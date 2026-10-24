import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import { Duo, RHYTHM, Shape } from "../components/bauhaus";
import { CATEGORIES, serviceUrl, slugify } from "../lib/site";
import { LeadForm } from "../components/lead-form";
import { CtaBand } from "./index";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const cat = CATEGORIES.find((c) => c.slug === slug);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
        el.classList.add("ring-2", "ring-brand");
        setTimeout(() => el.classList.remove("ring-2", "ring-brand"), 2200);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!cat) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link to="/" className="btn-brand mt-6">Go Home</Link>
      </div>
    );
  }

  const ci = CATEGORIES.findIndex((c) => c.slug === cat.slug);
  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-cream">
        <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-16">
          <div>
            <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-ink/60">
              <Link to="/" className="hover:text-brand">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-ink">{cat.title}</span>
            </nav>
            <p className="label-caps mt-6 flex items-center gap-2 text-royal">
              <Shape kind={RHYTHM[ci].kind} tone={RHYTHM[ci].tone} size={12} /> {cat.services.length} {cat.slug === "microsoft-certifications" ? "exams" : "services"}
            </p>
            <h1 className="rise mt-3 text-[42px] font-black leading-[1] tracking-[-0.04em] sm:text-[58px]">{cat.title}</h1>
            <p className="rise mt-5 max-w-xl text-[17px] leading-relaxed text-ink/80" style={{ animationDelay: "100ms" }}>{cat.intro}</p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "180ms" }}>
              <a href="#enquire" className="btn-brand">Get Free Consultation <ArrowRight className="h-4 w-4" /></a>
              <Link to="/contact" className="btn-ghost">Talk to an expert</Link>
            </div>
          </div>
          <div className="relative h-[260px] sm:h-[340px]">
            <div className="absolute inset-y-0 right-0 w-[88%] overflow-hidden rounded-tr-[100%] border-2 border-ink bg-royal">
              <Duo src={cat.image} eager className="absolute inset-0 !bg-transparent" />
            </div>
            <span className="absolute bottom-6 left-0 h-16 w-16 rounded-full bg-brand" />
            <span className="absolute left-[8%] top-4 h-10 w-10 bg-sun" />
          </div>
        </div>
      </section>

      <div className="border-b-2 border-ink bg-paper">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/services/${c.slug}`}
              className={`whitespace-nowrap border-2 px-4 py-2 text-[14px] font-bold transition ${
                c.slug === cat.slug ? "border-ink bg-ink text-white" : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-cream py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <h2 className="text-[28px] font-black sm:text-[34px]">{cat.slug === "microsoft-certifications" ? "All Microsoft Certifications" : `All ${cat.title} Services`}</h2>
            <p className="mt-2">{cat.slug === "microsoft-certifications" ? 'Tap "Learn More" to see who it is for and what you get.' : 'Tap "Learn More" to see details, documents and time taken.'}</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {cat.services.map((s, i) => {
                const r = RHYTHM[i % RHYTHM.length];
                return (
                  <div key={s.name} id={slugify(s.name)} className="card-bh card-bh-hover scroll-mt-32 flex flex-col p-5">
                    <div className="flex items-start gap-3">
                      <Shape kind={r.kind} tone={r.tone} size={18} className="mt-1" />
                      <div>
                        <h3 className="text-[17px] font-extrabold leading-snug">{s.name}</h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between pl-[30px] pt-4">
                      <Link to={serviceUrl(cat.slug, s.name)} className="inline-flex items-center gap-1 text-[14px] font-bold text-brand hover:gap-2">
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                      {s.days ? (
                        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink/60"><Clock className="h-3.5 w-3.5" /> {s.days}</span>
                      ) : <span />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside id="enquire" className="card-bh scroll-mt-28 shadow-[6px_6px_0_var(--color-ink)] lg:sticky lg:top-28">
            <div className="flex h-2"><span className="flex-1 bg-brand" /><span className="flex-1 bg-royal" /><span className="flex-1 bg-sun" /></div>
            <div className="p-6">
              <h3 className="text-[22px] font-black">Get a Free Call</h3>
              <p className="mt-1 text-[14px]">Our expert will call you and explain everything.</p>
              <div className="mt-5">
                <LeadForm layout="stack" source={`category:${cat.slug}`} defaultService={cat.services[0].name} />
              </div>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
