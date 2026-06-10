import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { brandIcons } from "@/lib/brand-icons";

const TILE =
  "group flex w-full items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-3.5 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export default function WeChatDialog({
  qrSrc,
  qrSrcSet,
}: {
  qrSrc: string;
  qrSrcSet?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={TILE}>
        <span className="flex size-9 shrink-0 items-center justify-center">
          <svg
            className="size-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={brandIcons.wechat.viewBox}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: brandIcons.wechat.inner }}
          />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-text">WeChat</span>
          <span className="block text-xs text-muted">Scan QR Code</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs text-center">
          <DialogTitle>WeChat</DialogTitle>
          <DialogDescription>Scan the code to connect on WeChat.</DialogDescription>
          <img
            src={qrSrc}
            srcSet={qrSrcSet}
            alt="WeChat QR code"
            className="mx-auto mt-4 w-56 rounded-[var(--radius-sm)] border border-border"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
