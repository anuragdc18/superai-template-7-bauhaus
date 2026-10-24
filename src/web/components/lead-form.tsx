import { useState } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { CATEGORIES } from "../lib/site";
import { useCreateLead } from "../queries/leads";

type Props = {
  layout?: "row" | "stack";
  source?: string;
  defaultService?: string;
  cta?: string;
  withEmail?: boolean;
  withMessage?: boolean;
};

export function LeadForm({
  layout = "row",
  source = "home",
  defaultService = "",
  cta = "Call Me Back",
  withEmail = false,
  withMessage = false,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const create = useCreateLead();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(digits)) return setError("Please enter a valid 10-digit mobile number.");
    if (!service) return setError("Please select a service.");
    create.mutate(
      { name, phone: digits, email, service, message, source },
      { onError: () => setError("Something went wrong. Please call or WhatsApp us.") },
    );
  };

  if (create.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-royal text-white">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <p className="text-lg font-extrabold text-ink">Thank you, {name.split(" ")[0]}!</p>
        <p className="text-[15px]">Our expert will call you on +91 {phone.replace(/\D/g, "").slice(-10)} within 30 minutes.</p>
      </div>
    );
  }

  const row = layout === "row";
  const lab = "label-caps mb-1.5 block text-[11.5px] text-ink";
  return (
    <form onSubmit={submit} noValidate>
      <div className={row ? "grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end" : "grid gap-4"}>
        <label className="block">
          <span className={lab}>Your Name</span>
          <input aria-label="Your name" className="field" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block">
          <span className={lab}>+91 Phone Number</span>
          <input
            aria-label="Mobile number"
            className="field"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </label>
        {withEmail && (
          <label className="block">
            <span className={lab}>Email (optional)</span>
            <input aria-label="Email" className="field" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        )}
        <label className="relative block">
          <span className={lab}>Select Service</span>
          <select
            aria-label="Select service"
            className={`field appearance-none !pr-10 ${service ? "" : "!text-[#8b8a80]"}`}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Choose a service</option>
            {CATEGORIES.map((c) => (
              <optgroup key={c.slug} label={c.title}>
                {c.services.map((s) => (
                  <option key={s.name} value={s.name} className="text-ink">
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Not sure / Other" className="text-ink">
              Not sure / Other
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-ink" />
        </label>
        {withMessage && (
          <label className="block">
            <span className={lab}>Message (optional)</span>
            <textarea
              aria-label="Message"
              className="field !h-28 py-3"
              placeholder="Tell us a little about your business"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        )}
        <button type="submit" disabled={create.isPending} className="btn-brand h-12 whitespace-nowrap md:min-w-[170px]">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {create.isPending ? "Sending..." : cta}
        </button>
      </div>
      <p className={`mt-3 text-[13px] ${error ? "font-semibold text-brand" : "text-[#6b6a62]"} ${row ? "md:text-left" : ""}`}>
        {error ?? "Free call. No spam. We reply within 30 minutes."}
      </p>
    </form>
  );
}
