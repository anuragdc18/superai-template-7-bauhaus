import { useEffect } from "react";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const site = useSite();
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    ...site.phones.map((p) => ({ icon: Phone, label: p.label || "Phone", value: p.number, href: telHref(p.number) })),
    ...site.emails.map((m) => ({ icon: Mail, label: m.label || "Email", value: m.email, href: `mailto:${m.email}` })),
    ...(site.addresses.length
      ? site.addresses.map((a) => ({ icon: MapPin, label: a.label || "Office", value: a.line, href: a.mapUrl || undefined }))
      : [{ icon: MapPin, label: "Office", value: site.city, href: undefined }]),
  ];
  const socials = (
    [
      ["facebook", Facebook],
      ["instagram", Instagram],
      ["linkedin", Linkedin],
      ["youtube", Youtube],
    ] as const
  ).filter(([k]) => site.socials[k]);
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="label-caps mb-3 flex items-center gap-2 text-royal"><span className="h-2.5 w-2.5 bg-brand" /> Contact Us</p>
          <h1 className="text-[42px] font-black leading-[1] tracking-[-0.04em] sm:text-[56px]">Let's Talk About Your <span className="relative inline-block">Business<span className="absolute -bottom-1 left-0 h-2 w-full bg-sun" /></span></h1>
          <p className="mt-4 max-w-md text-[17px]">Fill the form and our expert will call you within 30 minutes. The first consultation is free.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-royal text-white"><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[13px]">{it.label}</span>
                    <span className="block whitespace-pre-line font-extrabold text-ink">{it.value}</span>
                  </span>
                </>
              );
              return it.href ? (
                <a key={it.label + it.value} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="card-bh card-bh-hover flex items-center gap-3 p-4">{inner}</a>
              ) : (
                <div key={it.label + it.value} className="card-bh flex items-center gap-3 p-4">{inner}</div>
              );
            })}
          </div>
          <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-2 border-ink bg-wa px-6 py-3 font-bold text-white hover:brightness-95">
            <WaIcon /> Chat on WhatsApp
          </a>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-11 w-11 place-items-center border-2 border-ink bg-paper text-ink hover:bg-ink hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="card-bh p-6 shadow-[8px_8px_0_var(--color-ink)] sm:p-8">
          <div className="-mx-6 -mt-6 mb-6 flex h-2 sm:-mx-8 sm:-mt-8"><span className="flex-1 bg-brand" /><span className="flex-1 bg-royal" /><span className="flex-1 bg-sun" /></div>
          <h2 className="text-[26px] font-black">Request a Free Call</h2>
          <p className="mt-1 text-[14px]">Takes less than a minute.</p>
          <div className="mt-6">
            <LeadForm layout="stack" source="contact" cta="Get Free Consultation" withEmail withMessage />
          </div>
        </div>
      </div>
    </section>
  );
}
