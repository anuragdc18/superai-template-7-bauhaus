/** Bauhaus building blocks: primitive shapes, cobalt duotone photos, headings. */
export type ShapeKind = "circle" | "square" | "triangle";
export type Tone = "red" | "blue" | "yellow" | "ink";

const TONE: Record<Tone, string> = {
  red: "var(--color-brand)",
  blue: "var(--color-royal)",
  yellow: "var(--color-sun)",
  ink: "var(--color-ink)",
};

export function Shape({ kind, tone, size = 22, className = "" }: { kind: ShapeKind; tone: Tone; size?: number; className?: string }) {
  const fill = TONE[tone];
  if (kind === "triangle")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M12 2 23 22H1Z" fill={fill} />
      </svg>
    );
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${kind === "circle" ? "rounded-full" : ""} ${className}`}
      style={{ width: size, height: size, background: fill }}
    />
  );
}

/** The repeating Bauhaus rhythm used for icons and accent bars. */
export const RHYTHM: { kind: ShapeKind; tone: Tone }[] = [
  { kind: "square", tone: "red" },
  { kind: "circle", tone: "blue" },
  { kind: "triangle", tone: "yellow" },
  { kind: "square", tone: "red" },
  { kind: "circle", tone: "yellow" },
  { kind: "triangle", tone: "blue" },
  { kind: "circle", tone: "red" },
  { kind: "square", tone: "yellow" },
];
export const BAR: Tone[] = ["red", "blue", "yellow", "yellow", "red", "blue", "red"];
export const toneBg = (t: Tone) => TONE[t];

/** Any photo shown as cobalt duotone. */
export function Duo({ src, alt = "", className = "", imgClassName = "", eager = false }: { src: string; alt?: string; className?: string; imgClassName?: string; eager?: boolean }) {
  return (
    <div className={`duo ${className}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className={`h-full w-full object-cover ${imgClassName}`} />
    </div>
  );
}

export function SectionTitle({ label, title, text, center = false, light = false }: { label?: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={`mb-9 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      {label && (
        <p className={`label-caps mb-3 inline-flex items-center gap-2 ${light ? "text-sun" : "text-royal"}`}>
          <Shape kind="square" tone="red" size={10} /> {label}
        </p>
      )}
      <h2 className={`text-[30px] font-extrabold leading-[1.08] sm:text-[40px] ${light ? "!text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-3 text-[16px] ${light ? "text-white/75" : ""}`}>{text}</p>}
    </div>
  );
}
