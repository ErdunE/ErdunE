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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-text transition-colors hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent outline-none md:size-10"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation and quick links
        </SheetDescription>

        {/* Conversion CTA pinned to the top so Contact is always one tap away. */}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          Get in touch
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
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={RESUME_HREF}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "mt-auto w-full",
          })}
        >
          Résumé
        </a>
      </SheetContent>
    </Sheet>
  );
}
