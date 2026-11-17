import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, RESUME_HREF } from "@/lib/nav";
import { type Lang, t, UI } from "@/lib/i18n";

export default function MobileNav({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t(UI.nav.openMenu, lang)}
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-text transition-colors hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent outline-none md:size-10"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>{t(UI.nav.menu, lang)}</SheetTitle>
        <SheetDescription className="sr-only">
          {t(UI.nav.menuDescription, lang)}
        </SheetDescription>

        {/* Conversion CTA pinned to the top so Contact is always one tap away. */}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          {t(UI.sections.contact.heading, lang)}
        </a>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] px-3 font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              <span className="text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(link.label, lang)}
            </a>
          ))}
        </nav>

        <a
          href={RESUME_HREF[lang]}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "mt-auto w-full",
          })}
        >
          {t(UI.nav.resume, lang)}
        </a>
      </SheetContent>
    </Sheet>
  );
}
