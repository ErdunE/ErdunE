import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
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
          className="inline-flex size-10 items-center justify-center rounded-[var(--radius-sm)] text-text transition-colors hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent outline-none"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Menu</SheetTitle>
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={RESUME_HREF}
          target="_blank"
          rel="noopener"
          onClick={() => setOpen(false)}
          className={buttonVariants({ size: "lg", className: "mt-auto w-full" })}
        >
          Résumé
        </a>
      </SheetContent>
    </Sheet>
  );
}
