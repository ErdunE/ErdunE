import { useRef, useState } from "react";
import { Mail, Check } from "lucide-react";
import { type Lang, t, UI } from "@/lib/i18n";

// Click-to-copy email tile. Copies to the clipboard with a brief "Copied"
// confirmation announced via aria-live; falls back to the mailto link when the
// Clipboard API is unavailable (and for no-JS, the rendered href is the mailto).
export default function EmailCopy({
  email,
  mailto,
  lang,
}: {
  email: string;
  mailto: string;
  lang: Lang;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard) return; // let the mailto href proceed
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = mailto;
    }
  };

  return (
    <a
      href={mailto}
      onClick={onClick}
      aria-label={`Email ${email}, click to copy`}
      className="group focus-ring card-hover flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-3.5"
    >
      <span className="flex size-9 shrink-0 items-center justify-center">
        {copied ? (
          <Check className="size-6 text-accent" />
        ) : (
          <Mail className="size-6 text-accent" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-text">{t(UI.email.label, lang)}</span>
        <span className="block text-xs text-muted">
          {copied ? t(UI.email.copied, lang) : email}
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? t(UI.email.copiedAnnounce, lang) : ""}
      </span>
    </a>
  );
}
